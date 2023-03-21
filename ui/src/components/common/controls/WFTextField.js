import {
    withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const WFTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#bbbbbb'
        },
        '& .MuiInput - underline: after': {
            borderBottomColor: '#bbbbbb',
        },
        '& .MuioutlinedInput - root': {
            '& fieldset': {
                bordercolor: '#bbbbbb'
            },
            '&: hover fieldset': {
                bordercolor: '#bbbbbb',
            },
            '&.Mui - focused fieldset': {
                borderColor: '#bbbbbb',
            },
        },
    }
})(TextField);
export default WFTextField;
