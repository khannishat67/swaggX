import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import WFRouter from '../../router/WFRouter';
import AuthenticationProvider from '../auth/AuthenticationProvider';
import ErrorBoundary from '../common/controls/ErrorBoundary';
import Header from '../common/header/Header';
import './App.less';
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '20px',
        flexGrow: 1
    }
})
export default () => {
    const classes = useStyles();
    console.log("Router base: ", process.env.REACT_APP_ROUTER_BASE);
    return (
        <DndProvider backend={HTML5Backend}>
            <ErrorBoundary>
                <Router basename={process.env.REACT_APP_ROUTER_BASE || '/'}>
                    <AuthenticationProvider>
                        <Header />
                        <Container maxWidth="lg" className={classes.container}>
                            <WFRouter />
                        </Container>
                        <div className="app-footer">
                            &copy; Cognizant Technology Solutions 2020
                        </div>
                    </AuthenticationProvider>
                </Router>
            </ErrorBoundary>
        </DndProvider>
    );
}
