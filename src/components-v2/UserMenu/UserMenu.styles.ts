import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 643,
      '& .MuiTabs-scroller': {
        height: 56,
      },
      '& .MuiTab-root': {
        height: 56,
      },
      '& .MuiBox-root': {
        paddingTop: 0,
      },
    },
  }),
);