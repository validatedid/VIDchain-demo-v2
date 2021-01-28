import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const NextButton = withStyles((theme) => ({
    root: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '1%',
    paddingBottom: '1%',
    display: 'block',
    borderStyle: 'none',
    background: '#151A35',
    borderRadius: '2px',
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: '16px',
    lineHeight: '19px',
    fontStyle: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    },
  }))(Button);
  