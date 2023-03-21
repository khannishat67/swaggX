import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as resourceString from '../../../resources/resource-strings.json';
import UserContext from '../../auth/UserContext';
import './Header.less';

const Header = (props) => {
    const userContext = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(userContext);

    const logout = () => {
        userContext.keycloak.logout();
    }

    return (
        <AppBar position="static">
            <Toolbar variant="regular">
                <Typography variant="h5" color="inherit" className="brand flex-grow" >
                    {resourceString.logo_alt}
                </Typography>
                {(props.location.pathname !== '/data-dictionary-console'
                    && (!userContext || (userContext && userContext.userInfo && userContext.userInfo.hasMaintainerRole === true)))
                    &&
                    <Link to='/data-dictionary-console' className="mr-24 app-link">
                        {resourceString.dd_header_link}
                    </Link>
                }
                {props.location.pathname === '/data-dictionary-console' &&
                    <Link to='/' variant="subtitle1" color="inherit" className="mr-24 app-link">
                        {resourceString.home_btn}
                    </Link>}
                {(userContext && userContext.userInfo) &&
                    <>
                        <Button color="primary" onClick={handleClick}>
                            <span className="text-white">{`${resourceString.welcome_text}${userContext.userInfo.firstName}`}</span><ArrowDropDown style={{color: 'white'}} />
                        </Button>
                        <Menu anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={logout}>{resourceString.logout_btn}</MenuItem>
                        </Menu>
                    </>

                }
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);
