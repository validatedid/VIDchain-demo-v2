import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const RestartButton = withStyles((theme) => ({
    root: {
    width: '188px',
    height: '53px',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '1%',
    paddingBottom: '1%',
    display: 'block',
    borderStyle: 'solid',
    background: '#151A35',
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: '6%',
    fontSize: '16px',
    lineHeight: '19px',
    fontStyle: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    borderColor: '#EAE8F1',
    borderWidth: '1.5px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    fontFamily: 'TTNorms',
    },
  }))(Button);
  