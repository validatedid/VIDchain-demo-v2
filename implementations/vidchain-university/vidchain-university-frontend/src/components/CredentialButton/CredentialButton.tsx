import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const CredentialButton = withStyles((theme) => ({
    root: {
    padding: '1%',
    display: 'block',
    borderStyle: 'none',
    width: '285.17px',
    height: '46px',
    background: '#9D56BE',
    borderRadius: '4px',
    color: '#ffffff',
    left: '25%',
    marginTop: '2%',
    marginBottom: '5%',
    fontSize: '16px',
    lineHeight: '19px',
    fontStyle: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    },
  }))(Button);
  