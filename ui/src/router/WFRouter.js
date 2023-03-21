import { Paper } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { lazy, Suspense, useState } from 'react';
import {
    Link, Route,
    Switch,

    useLocation
} from 'react-router-dom';
import Footer from '../components/common/footer/Footer';
import Loader from '../components/common/progress/Loader';
import CosmosHome from '../views/CosmosHome';
const CosmosSwaggerBuilder = lazy(() => import('../views/CosmosSwaggerBuilder'));
const CosmosSwaggerReview = lazy(() => import('../views/CosmosSwaggerReview'));
const CosmosSwaggerEditor = lazy(() => import('../views/CosmosSwaggerEditor'));
const CosmosDDConsole = lazy(() => import('../views/CosmosDDConsole'));
export default (props) => {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === '/' ? '/swagger-builder' : location.pathname);
    console.log(value);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {

                location.pathname === '/swagger-builder' || location.pathname === '/swagger-editor' || location.pathname === '/swagger-review' ?
                    <Paper>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="BUILDER" value="/swagger-builder" component={Link} to='/swagger-builder' />
                            <Tab label="EDITOR" value="/swagger-editor" component={Link} to='/swagger-editor' />
                            <Tab value="/swagger-review" label="SWAGGER REVIEW" component={Link} to='/swagger-review' />
                        </Tabs>
                    </Paper>
                    : null
            }
            <Switch>
                <Route exact path='/swagger-builder'>
                    <Suspense fallback={<Loader />}>
                        <CosmosSwaggerBuilder className="mt-20" />
                    </Suspense>
                </Route>
                <Route exact path='/swagger-review'>
                    <Suspense fallback={<Loader />}>
                        <CosmosSwaggerReview />
                    </Suspense>
                </Route>
                <Route exact path='/swagger-editor'>
                    <Suspense fallback={<Loader />}>
                        <CosmosSwaggerEditor />
                    </Suspense>
                </Route>
                <Route exact path='/data-dictionary-console'>
                    <Suspense fallback={<Loader />}>
                        <CosmosDDConsole />
                    </Suspense>
                </Route>
                <Route exact path='/'>
                    <CosmosHome />
                </Route>
            </Switch>
        </>
    );
}