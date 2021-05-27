import React from 'react';

import Notification from './notif-list.component';

import { useUser } from 'src/components/user/user.context';

interface NotifProps {
  title?: string;
}

const NotificationComponent: React.FC<NotifProps> = props => {
  const { state } = useUser();

  if (!state.user) return null;

  return (
    <div style={{ padding: 8 }}>
      <div style={{ paddingTop: 24, paddingBottom: 8 }} />
      <Notification user={state.user} />
    </div>
  );
};

export default NotificationComponent;
