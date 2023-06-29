import { useState, useContext } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiContext";
import { Alert } from "@mui/material";

import { POST_METHOD, PASSWORD_RESET_PATH } from "../utils/constants";

const PasswordReset = () => {

  const [formData, setFormData] = useState({ email: '' });
  const [responseMessage, setResponseMessage] = useState('')

  const apiContext = useContext(ApiContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { email: formData.email }

    apiContext.fetchData(POST_METHOD, PASSWORD_RESET_PATH, requestData).then(response => {
      if (response) {
        setResponseMessage(response.data.message);
      }
    })
    setFormData({ email: '' });
    setTimeout(() => setResponseMessage(null), 10000);
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
          PASSWORD RESET
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
            autoFocus
            type="email"
            value={formData.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SEND EMAIL
          </Button>
        </Box>
      </Box>
      {responseMessage && <Alert severity="success">{responseMessage}</Alert>}
    </Container>
  );
}
export default PasswordReset 