import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import UserContext from './UserContext';

const env = process.env.NODE_ENV || 'local';
const authProvider = require(`./${env}/keycloak.json`);

export default (props) => {
    const [authContext, setAuthContext] = useState(null);

    useEffect(() => {
        const authInit = async () => {
            try {
                const keycloak = new Keycloak({...authProvider});
                const authenticated = await keycloak.init({onLoad: 'login-required', checkLoginIframe : false});
                if (!authenticated) {
                    window.location.reload();
                }
                else {
                    const userInfo = await keycloak.loadUserProfile();
                    const isMaintainer = await keycloak.hasRealmRole('MAINTAINER');
                    setAuthContext({
                        keycloak,
                        userInfo: {
                            ...userInfo,
                            roles: keycloak.realmAccess.roles,
                            hasMaintainerRole: isMaintainer
                        }
                    });
                }
            }
            catch(e) {
                console.log(e)
            }
        }
        if(process.env.NODE_ENV!=='development') {
            authInit();
        }
    }, []);

    return (
        <UserContext.Provider value={authContext}>
            {props.children}
        </UserContext.Provider>
    );
}