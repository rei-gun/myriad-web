import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxHeight: '100vh',
      overflow: 'auto'
    },
    appWrapper: {
      display: 'flex',
      margin: '0 32px  0 32px'
    },
    contentWrapper: {
      display: 'flex',
      flex: '1 1 auto',
      marginTop: 32
    },
    user: {
      flex: '0 0 327px',
      marginRight: 0,
      height: '100vh',
      'overflow-y': 'scroll !important',
      'scrollbar-color': '#A942E9 #171717',
      'scrollbar-width': 'thin !important'
    },
    content: {
      flex: '1 1 auto',
      padding: '0 24px 0 24px',
      height: '100vh'
    },
    experience: {
      flex: '0 0 327px',
      height: '100vh',
      overflowY: 'scroll',
      'scrollbar-color': '#A942E9 #171717 ',
      'scrollbar-width': 'thin !important'
    },
    wallet: {
      width: 327
    },

    fullheight: {
      height: '100vh'
    },
    grow: {
      flexGrow: 1
    },
    normal: {}
  })
);
