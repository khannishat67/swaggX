import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#931a25'
        },
        secondary: {
            main: '#e97171'
        },
        background: {
            paper: '#fff',
            default: '#f5efef'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'Montserrat'
        },
        h1: {
            fontFamily: 'Lexend-Peta'
        },
        h2: {
            fontFamily: 'Lexend-Peta'
        },
        h3: {
            fontFamily: 'Lexend-Peta'
        },
        h4: {
            fontFamily: 'Lexend-Peta'
        },
        h5: {
            fontFamily: 'Lexend-Peta'
        },
        h6: {
            fontFamily: 'Lexend-Peta'
        },
        subtitle1: {
            fontFamily: 'Lexend-Peta'
        },
        body2: {
            fontSize: '14px'
        }

    }
});