/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { JWT, SERVER_ERROR, LOGIN_PATH, ROLE, USER_PROFILE_PATH } from '../utils/constants';

const ApiContext = createContext(null)



function ApiProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const getErrorMessage = (err) => {
        const errorDetails = err.response?.data?.details;
        const error = errorDetails
            ? typeof errorDetails === "string"
                ? errorDetails
                : errorDetails.map((err) => `${err.msg} `)
            : SERVER_ERROR;
        if (error === SERVER_ERROR) navigate(LOGIN_PATH);
        return error
    }


    const fetchData = async function (reqMethod, path, reqData) {
        try {
            let headers = {}
            if (localStorage[JWT]) {
                headers.authorization = localStorage[JWT]
            }
            const response = await axios({
                method: reqMethod,
                url: `${process.env.REACT_APP_SERVER_URL}${path}`,
                data: reqData,
                headers: headers
            })
            return response;
        }
        catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem(JWT)
                localStorage.removeItem(ROLE)
                navigate(LOGIN_PATH)
            }
            if (err.response && err.response.status === 403) navigate(USER_PROFILE_PATH)
            const error = getErrorMessage(err)
            setErrorMessage(error)
            setTimeout(() => setErrorMessage(null), 7000)
        }
    }

    return (
        <ApiContext.Provider value={useMemo(() => ({ fetchData }), [fetchData])} >
            <Snackbar open={!!errorMessage}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            {children}
        </ApiContext.Provider>
    );
}


export { ApiContext, ApiProvider }