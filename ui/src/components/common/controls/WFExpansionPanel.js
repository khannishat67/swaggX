import { makeStyles, withStyles } from '@material-ui/core/styles';
import DefaultExpansionPanel from '@material-ui/core/ExpansionPanel';
import DefaultExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import DefaultExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: '15px',
        minHeight: '36px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const ExpansionPanel = withStyles({
    root: {
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: '5px auto 10px auto',
        },
    },
    expanded: {},
})(DefaultExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        width: '100%',
        minHeight: 36,
        borderBottom: '1px solid rgb(0,0,0, .125)',
        marginBottom: - 1,
        '&$expanded': {
            minHeight: 36,
        },
    },
    content: {
        margin: '6px 0',
        '&$expanded': {
            margin: '6px 0',
        },
    },
    expanded: {},
})(DefaultExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        width: '100%'
    },
}))(DefaultExpansionPanelDetails);

export {
    useStyles,
    Typography,
    ExpandMoreIcon,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
};
