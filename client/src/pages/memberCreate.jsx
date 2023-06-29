import { useState, useContext } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiContext";
import { useNavigate } from "react-router-dom";

import { POST_METHOD, MEMBER_PATH, USER_PROFILE_PATH } from "../utils/constants";
import { Alert, Snackbar } from "@mui/material";

const MemberCreate = () => {

    const [formData, setFormData] = useState();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState()
    const apiContext = useContext(ApiContext);


    const validatePasswords = (pass, repeatPass) => {
        if(pass !== repeatPass) {
            setErrorMessage('Passwords must match')
            setTimeout(() => setErrorMessage(null), 7000)
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(validatePasswords(formData.password, formData.repeatPassword)){
            const requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                address: formData.address,
                dateOfBirth: formData.dateOfBirth,
                password: formData.password,
            }
    
            apiContext.fetchData(POST_METHOD, MEMBER_PATH, requestData).then(response => {
                if (response) navigate(USER_PROFILE_PATH, { state: { message: response.data.message } })
            })
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value

        }))
    }

    return (
        <Container component="main" maxWidth="xs">

            <Snackbar open={!!errorMessage}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Create new Member
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First name"
                        name="firstName"
                        onChange={handleChange}
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        type="email"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="dateOfBirth"
                        name="dateOfBirth"
                        defaultValue={new Date().toISOString().substr(0, 10)}
                        onChange={handleChange}
                        type="date"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="repeatPassword"
                        label="Repeat password"
                        name="repeatPassword"
                        onChange={handleChange}
                        type="password"
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default MemberCreate 