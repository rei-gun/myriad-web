import {Actions as BaseAction, setLoading, setError} from '../base/actions';
import {RootState} from '../index';
import * as constants from './constants';

import axios from 'axios';
import {Action} from 'redux';
import {Like} from 'src/interfaces/interaction';
import {Post, PostProps} from 'src/interfaces/post';
import {TimelineFilter, TimelineSortMethod, TimelineType} from 'src/interfaces/timeline';
import {UserProps} from 'src/interfaces/user';
import {WalletDetail, ContentType} from 'src/interfaces/wallet';
import * as InteractionAPI from 'src/lib/api/interaction';
import {ListMeta} from 'src/lib/api/interfaces/base-list.interface';
import * as PostAPI from 'src/lib/api/post';
import {ThunkActionCreator} from 'src/types/thunk';

/**
 * Action Types
 */

export interface LoadTimeline extends Action {
  type: constants.LOAD_TIMELINE;
  payload: {
    posts: Post[];
    sort?: TimelineSortMethod;
    filter?: TimelineFilter;
    type?: TimelineType;
    meta: ListMeta;
  };
}

export interface AddPostToTimeline extends Action {
  type: constants.ADD_POST_TO_TIMELINE;
  post: Post;
}

export interface LikePost extends Action {
  type: constants.LIKE_POST;
  postId: string;
  like: Like;
}

export interface RemoveLikePost extends Action {
  type: constants.REMOVE_LIKE_POST;
  postId: string;
}

export interface DislikePost extends Action {
  type: constants.DISLIKE_POST;
  postId: string;
  like: Like;
}

export interface RemoveDisikePost extends Action {
  type: constants.REMOVE_DISLIKE_POST;
  postId: string;
}

export interface RemovePost extends Action {
  type: constants.REMOVE_POST;
  postId: string;
}

export interface UpdateTimelineFilter extends Action {
  type: constants.UPDATE_TIMELINE_FILTER;
  filter: TimelineFilter;
}

export interface FetchWalletDetails extends Action {
  type: constants.FETCH_WALLET_DETAILS;
  payload: WalletDetail;
}

export interface ClearTimeline extends Action {
  type: constants.CLEAR_TIMELINE;
}

export interface FetchDedicatedPost extends Action {
  type: constants.FETCH_DEDICATED_POST;
  post: Post;
}

export interface UpdatePostPlatformUser extends Action {
  type: constants.UPDATE_POST_PLATFORM_USER;
  userId: string;
  user: Partial<UserProps>;
}

/**
 * Union Action Types
 */

export type Actions =
  | LoadTimeline
  | AddPostToTimeline
  | UpdateTimelineFilter
  | LikePost
  | RemoveLikePost
  | DislikePost
  | RemoveDisikePost
  | FetchWalletDetails
  | RemovePost
  | ClearTimeline
  | FetchDedicatedPost
  | UpdatePostPlatformUser
  | BaseAction;

export const updateFilter = (filter: TimelineFilter): UpdateTimelineFilter => ({
  type: constants.UPDATE_TIMELINE_FILTER,
  filter,
});

export const clearTimeline = (): ClearTimeline => ({
  type: constants.CLEAR_TIMELINE,
});

/**
 *
 * Actions
 */
export const setPost = (post: Post): FetchDedicatedPost => ({
  type: constants.FETCH_DEDICATED_POST,
  post,
});

/**
 * Action Creator
 */
export const loadTimeline: ThunkActionCreator<Actions, RootState> =
  (page = 1, sort?: TimelineSortMethod, filter?: TimelineFilter, type?: TimelineType) =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const {timelineState, userState} = getState();
      const userId = userState.user?.id as string;
      const timelineType = type ?? timelineState.type;
      const timelineFilter = filter ?? timelineState.filter;
      const timelineSort = sort ?? timelineState.sort;

      const {data: posts, meta} = await PostAPI.getPost(
        page,
        userId,
        timelineType,
        timelineSort,
        timelineFilter,
      );

      dispatch({
        type: constants.LOAD_TIMELINE,
        payload: {
          posts,
          sort,
          filter,
          type,
          meta,
        },
      });
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createPost: ThunkActionCreator<Actions, RootState> =
  (post: PostProps, images: string[]) => async (dispatch, getState) => {
    const {
      userState: {user},
    } = getState();

    setLoading(true);

    try {
      if (!user) {
        throw new Error('User not found');
      }

      // TODO: simplify this
      const data = await PostAPI.createPost({
        ...post,
        platform: 'myriad',
        createdBy: user.id,
        tags: post.tags || [],
        asset: {
          images,
          videos: [],
        },
      });

      dispatch({
        type: constants.ADD_POST_TO_TIMELINE,
        post: {
          ...data,
          user,
        },
      });
    } catch (error) {
      dispatch(
        setError({
          message: 'Failed to create post, try again later',
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const importPost: ThunkActionCreator<Actions, RootState> =
  (postUrl: string, callback?: () => void) => async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const {
        userState: {user},
      } = getState();

      if (!user) {
        throw new Error('User not found');
      }

      const post = await PostAPI.importPost({
        url: postUrl,
        importer: user.id,
      });

      dispatch({
        type: constants.ADD_POST_TO_TIMELINE,
        post,
      });

      callback && callback();
    } catch (error) {
      let message = error.message;

      if (axios.isAxiosError(error) && error.response?.status === 422) {
        message = 'Post already imported';
      }

      dispatch(
        setError({
          message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updatePostPlatformUser: ThunkActionCreator<Actions, RootState> =
  (url: string) => async (dispatch, getState) => {
    const {
      userState: {user},
    } = getState();

    if (user) {
      const updatedProps: Partial<UserProps> = {
        profilePictureURL: url,
      };

      dispatch({
        type: constants.UPDATE_POST_PLATFORM_USER,
        userId: user.id,
        user: updatedProps,
      });
    }
  };

export const toggleLikePost: ThunkActionCreator<Actions, RootState> =
  (post: Post) => async (dispatch, getState) => {
    let liked: Like | undefined;
    let disliked: Like | undefined;

    dispatch(setLoading(true));

    try {
      const {
        userState: {user},
      } = getState();

      if (!user) {
        throw new Error('User not found');
      }

      if (post.likes) {
        liked = post.likes.find(like => {
          return like.userId === user.id && like.state;
        });

        disliked = post.likes.find(like => {
          return like.userId === user.id && !like.state;
        });
      }

      if (liked) {
        await InteractionAPI.removeLike(liked.id);

        dispatch({
          type: constants.REMOVE_LIKE_POST,
          postId: post.id,
        });
      } else {
        const like = await InteractionAPI.like(user.id, post);

        if (disliked) {
          await InteractionAPI.removeLike(disliked.id);
        }

        dispatch({
          type: constants.LIKE_POST,
          postId: post.id,
          like,
        });
      }
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const toggleDislikePost: ThunkActionCreator<Actions, RootState> =
  (post: Post) => async (dispatch, getState) => {
    let disliked: Like | undefined;
    let liked: Like | undefined;

    dispatch(setLoading(true));

    try {
      const {
        userState: {user},
      } = getState();

      if (!user) {
        throw new Error('User not found');
      }

      if (post.likes) {
        disliked = post.likes.find(like => {
          return like.userId === user.id && !like.state;
        });
      }

      if (disliked) {
        await InteractionAPI.removeLike(disliked.id);

        dispatch({
          type: constants.REMOVE_DISLIKE_POST,
          postId: post.id,
        });
      } else {
        const like = await InteractionAPI.dislike(user.id, post);

        if (liked) {
          await InteractionAPI.removeLike(liked.id);
        }

        dispatch({
          type: constants.DISLIKE_POST,
          postId: post.id,
          like,
        });
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchWalletDetails: ThunkActionCreator<Actions, RootState> =
  (postId: string) => async dispatch => {
    dispatch(setLoading(true));
    try {
      const {walletAddress} = await PostAPI.getWalletAddress(postId);

      const walletDetailPayload = {
        walletAddress,
        referenceId: postId,
        contentType: ContentType.POST,
      };

      dispatch({
        type: constants.FETCH_WALLET_DETAILS,
        payload: walletDetailPayload,
      });
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

export const deletePost: ThunkActionCreator<Actions, RootState> =
  (postId: string) => async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const {
        userState: {user},
      } = getState();

      if (!user) {
        throw new Error('User not found');
      }

      await PostAPI.removePost(postId);
      dispatch({
        type: constants.REMOVE_POST,
        postId,
      });
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getDedicatedPost: ThunkActionCreator<Actions, RootState> =
  (postId: string) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const {
        userState: {user},
      } = getState();

      if (!user) {
        throw new Error('User not found');
      }

      const post = await PostAPI.getPostDetail(postId);
      dispatch(setPost(post));
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
