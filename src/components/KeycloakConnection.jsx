import React, { useState } from "react";
import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import { setUserStorage, cleareUserStorage } from '../utils/userStorage';

function KeycloakConnection() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keycloak, setKeycloak] = useState({});

    const url = 'https://me-fit-app.herokuapp.com/api/v1/profiles/';
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) {
            const keycloak = Keycloak('/keycloak.json');
            keycloak.init({ onLoad: 'login-required' }).then(() => {
                // setIsAuthenticated(true);         
                setKeycloak(keycloak);
            })
        }
    }, [isAuthenticated]);

    function handleLoginComplete(keycloak) {
        let token = keycloak.token;
        let tokenParsed = keycloak.tokenParsed;
        console.log(token);
        console.log(tokenParsed);
        setUserStorage('ra_session', { token, tokenParsed });
        getProfileData(keycloak.tokenParsed.sub);
    }

    async function getProfileData(id) {
        try {
            let response = await fetch(url + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
            });

            if (response.status === 404) {
                history.replace('/profile');
            } else if (response.status === 200) {
                history.replace('/dashboard');
            } else {
                alert("Token error");
            }
        } catch (error) {
            console.log("error is: " + error);
        }
    }

    if (keycloak.token) {
        if (!isAuthenticated) {
            handleLoginComplete(keycloak);
            setIsAuthenticated(true);
        }
        return (
            <div>
                <button onClick={() => {
                    keycloak.logout();
                    cleareUserStorage();
                }}>Logout</button>
            </div>

        )
    } else {
        return (
            <div></div>
        )
    }

};

export default KeycloakConnection;