import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const CredentialButton = withStyles((theme) => ({
    root: {
      width: '153px',
      height: '46px',
      backgroundColor: '#2F61FF',
      borderRadius: '4px;',
      color: '#ffffff',
      fontSize: '18px',
      lineHeight: '19px',
      fontStyle: 'normal',
      textAlign: 'center',
      textTransform: 'capitalize',
      marginBottom: '10px'
    },
  }))(Button);
  