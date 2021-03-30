import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const SignInButton = withStyles((theme) => ({
    root: {
      width: '248px',
      height: '46px',
      backgroundColor: '#2F61FF',
      bordeRadius: '4px',
      color: '#FFFFFF',
      fontSize: '18px',
      lineHeight: '19px',
      fontStyle: 'normal',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  }))(Button);
  