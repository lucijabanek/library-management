import { useState, useEffect, useContext } from "react"

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiContext } from "../context/apiContext";
import { useLocation } from 'react-router-dom';
import { Alert } from "@mui/material";

import { GET_METHOD, USER_PROFILE_PATH } from "../utils/constants";


const Profile = () => {
    const [data, setData] = useState()

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message)
    setTimeout(() => setMessage(null), 7000);

    const apiContext = useContext(ApiContext);

    useEffect(() => {
        apiContext.fetchData(GET_METHOD, USER_PROFILE_PATH, {}).then(response => {
            if (response) setData(response.data.data)
        })
    }, [apiContext])


    return (
        <Container component="main" maxWidth="xs">
            {message && <Alert severity="success">{message}</Alert>}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid container>
                    {data && (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell component="th" scope="row" colSpan={2} align="center">
                                            User Profile
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key='firstName' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            First name:
                                        </TableCell>
                                        <TableCell align="right">
                                            {data.User.firstName}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key='lastName' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            Last name:
                                        </TableCell>
                                        <TableCell align="right">
                                            {data.User.lastName}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key='email' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            Email:
                                        </TableCell>
                                        <TableCell align="right">
                                            {data.User.email}
                                        </TableCell>
                                    </TableRow>

                                    {data.subscriptionExpirationDate && (

                                        <TableRow key='subExpiration' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                Membership expiration date:
                                            </TableCell>
                                            <TableCell align="right">
                                                {data.subscriptionExpirationDate}
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>

                            </Table>
                        </TableContainer>
                    )}
                </Grid>

            </Box>
        </Container>
    );
}
export default Profile 