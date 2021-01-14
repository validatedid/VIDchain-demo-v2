import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const SignInButton = withStyles((theme) => ({
    root: {
    padding: '1%',
    position: 'absolute',
    marginTop: '2%',
    left: '42%',
    display: 'block',
    borderStyle: 'none',
    borderRadius: '1px',
    backgroundColor: '#6e3188',
    boxShadow: 'none',
    textShadow: 'none',
    color: '#f7f7f7',
    fontSize: '16px',
    lineHeight: '19px',
    fontStyle: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    },
  }))(Button);
  