import React, { useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles, fade } from '@material-ui/core/styles';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { ListHeaderComponent } from './list-header.component';
import { ListSubHeaderComponent } from './list-sub-header.component';
import { useFriendsHook } from './use-friends-hook';

import ShowIf from 'src/components/common/show-if.component';
import { useFriends } from 'src/components/friends/friends.context';
import { User } from 'src/interfaces/user';

type Props = {
  user: User;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: '#424242',
      color: '#E0E0E0',
      margin: '8px 0'
    },
    header: {
      textAlign: 'center'
    },
    content: {
      '&:last-child': {
        paddingBottom: 0
      }
    },
    list: {
      margin: '8px 0',
      '& .MuiListItem-root': {
        '&:nth-child(odd)': {
          backgroundColor: fade('#FFFFFF', 0.2)
        }
      }
    },
    item: {
      marginBottom: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),

      '& .MuiListItemText-root': {
        alignSelf: 'center'
      }
    }
  })
);

const Friends = ({ user }: Props) => {
  const style = useStyles();

  const { state } = useFriends();
  const { loadFriends } = useFriendsHook(user);

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <Box className={style.root}>
      <ListHeaderComponent title={`Friends (${state.friends.length})`} />

      <div>
        <ListSubHeaderComponent title={`Online (${state.friends.length})`} />
        <div className={style.content}>
          <ShowIf condition={state.friends.length === 0}>
            <Typography variant="h4" color="textPrimary" style={{ textAlign: 'center', padding: '16px 0' }}>
              No Friends
            </Typography>
          </ShowIf>

          <List className={style.list}>
            {state.friends.map(request => {
              return (
                <ListItem key={request.id} className={style.item} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={request.requestor.name} src={request.requestor.profilePictureURL} />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography component="span" variant="h4" color="textPrimary" style={{ color: '#000000', fontSize: 16 }}>
                      {request.requestor.name}
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <RadioButtonCheckedIcon style={{ color: '#06960C' }} />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>

      <div>
        <ListSubHeaderComponent title={`Others (${state.friends.length})`} />
      </div>
    </Box>
  );
};

export default Friends;
