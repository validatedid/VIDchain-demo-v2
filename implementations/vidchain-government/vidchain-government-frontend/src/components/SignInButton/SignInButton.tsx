import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

export const SignInButton = withStyles((theme) => ({
    root: {
    width: '227px',
    height: '41px',
    position: 'absolute',
    marginTop: '5%',
    left: '25%',
    display: 'block',
    borderStyle: 'none',
    borderRadius: '1px',
    backgroundColor: '#f75a98',
    background: '-webkit-linear-gradient(#fca52a, #e83b68)',
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
  