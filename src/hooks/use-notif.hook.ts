import {useDispatch} from 'react-redux';

import {
  fetchNotification,
  readAllNotifications,
  numOfNewNotifications,
} from 'src/reducers/notification/actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useNotifHook = () => {
  const dispatch = useDispatch();

  const loadNotifications = async () => {
    dispatch(fetchNotification());
  };

  const readNotifications = () => {
    dispatch(readAllNotifications());
  };

  const loadNumOfNewNotifications = () => {
    dispatch(numOfNewNotifications());
  };

  return {
    loadNotifications,
    readNotifications,
    loadNumOfNewNotifications,
  };
};
