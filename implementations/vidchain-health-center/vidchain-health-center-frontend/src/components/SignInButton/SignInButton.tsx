import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const SignInButton = withStyles((theme) => ({
    root: {
      width: '248px',
      height: '46px',
      background: `linear-gradient(180deg, #7AB642 0%, #148C4C 72.86%)`,
      borderRadius: '4px',
      color: '#ffffff',
      fontSize: '18px',
      lineHeight: '19px',
      fontStyle: 'normal',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  }))(Button);
  