import { useState, useContext } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiContext";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  POST_METHOD, PASSWORD_CREATE_USER_PATH,
  PASSWORD_CREATE_TOKEN_QUERY, PASSWORD_CREATE_EMAIL_QUERY,
  LOGIN_PATH
} from "../utils/constants";

const PasswordReset = () => {

  const [formData, setFormData] = useState();
  const navigate = useNavigate()
  const apiContext = useContext(ApiContext);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, token, email } = Object.fromEntries(searchParams.entries());
    const requestData = { newPassword: formData.newPassword }

    apiContext.fetchData(
      POST_METHOD,
      `${PASSWORD_CREATE_USER_PATH}${user}${PASSWORD_CREATE_TOKEN_QUERY}${token}${PASSWORD_CREATE_EMAIL_QUERY}${email}`,
      requestData
    ).then(response => {
      if (response) navigate(LOGIN_PATH, { state: { message: response.data.message } })
    })
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
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Create new password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New password"
            name="newPassword"
            onChange={handleChange}
            autoFocus
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
export default PasswordReset 