import {useSelector, useDispatch} from 'react-redux';

import {TimelineFilter, TimelineType} from 'src/interfaces/timeline';
import {User} from 'src/interfaces/user';
import {RootState} from 'src/reducers';
import {loadTimeline} from 'src/reducers/timeline/actions';
import {TimelineState} from 'src/reducers/timeline/reducer';

export const useProfileTimeline = (people: User) => {
  const {sort} = useSelector<RootState, TimelineState>(state => state.timelineState);
  const dispatch = useDispatch();

  const filterOriginalPost = async () => {
    const filter: TimelineFilter = {
      platform: ['myriad'],
      owner: people.id,
    };

    dispatch(loadTimeline(1, sort, filter, TimelineType.TRENDING));
  };

  const filterImportedPost = async () => {
    const filter: TimelineFilter = {
      platform: ['facebook', 'reddit', 'twitter'],
      importer: people.id,
    };

    dispatch(loadTimeline(1, sort, filter, TimelineType.TRENDING));
  };

  return {
    filterOriginalPost,
    filterImportedPost,
  };
};