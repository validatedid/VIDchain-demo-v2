import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

export const SignInButton = withStyles((theme) => ({
    root: {
    width: '16%',
    height: '41px',
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
  