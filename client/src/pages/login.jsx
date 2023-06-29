import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiContext";
import { useLocation } from 'react-router-dom';
import { Alert } from "@mui/material";

import {
  JWT, USER_PROFILE_PATH,
  POST_METHOD, LOGIN_PATH,
  BEARER, ROLE
} from "../utils/constants";

const Login = () => {
  const apiContext = useContext(ApiContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message)
  setTimeout(() => setMessage(null), 7000);


  useEffect(() => {
    if (localStorage[JWT]) {
      navigate(USER_PROFILE_PATH);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestData = { email: formData.email, password: formData.password }
    apiContext.fetchData(POST_METHOD, LOGIN_PATH, requestData).then(response => {
      if (response) {
        localStorage.setItem(JWT, `${BEARER} ${response.data.token}`);
        localStorage.setItem(ROLE, response.data.role);
        navigate(USER_PROFILE_PATH)
      }
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            type='email'
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href={`${process.env.REACT_APP_BASE_URL}/user/password-reset`} variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {message && <Alert severity="success">{message}</Alert>}
    </Container>
  );
}
export default Login 