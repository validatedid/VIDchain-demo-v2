import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const CredentialButton = withStyles((theme) => ({
    root: {
      width: window.innerWidth < 768 ? '207px' : '407px',
      height: '46px',
      backgroundColor: '#428443',
      borderRadius: '4px;',
      color: '#ffffff',
      fontSize: '18px',
      lineHeight: '19px',
      fontStyle: 'normal',
      textAlign: 'center',
      textTransform: 'capitalize',
      marginBottom: '20px'
    },
  }))(Button);
  