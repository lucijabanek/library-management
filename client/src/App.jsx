import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import UserProfile from "./pages/profile";
import PasswordReset from "./pages/passwordReset";
import PasswordCreate from "./pages/passwordCreate";
import MemberCreate from "./pages/memberCreate";
import { ApiProvider } from './context/apiContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from "./components/Navbar";
import Lendings from './pages/Lendings';

import {
  LOGIN_PATH, USER_PROFILE_PATH,
  PASSWORD_RESET_PATH, PASSWORD_CREATE_PATH,
  MEMBER_CREATE_PATH, LENDINGS_PATH
} from "./utils/constants";

const theme = createTheme({
  fontSize: "1.6rem",
  palette: {
    primary: {
      contrastText: "#000",
      dark: "#707070",
      light: "#cfcfcf",
      main: "#9e9e9e",
    },
    secondary: {
      contrastText: "#fff",
      dark: "#000000",
      light: "#484848",
      main: "#212121",
    },
  },
  minHeight: "3rem"
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <ApiProvider>
          <Routes>
            <Route path={LOGIN_PATH} element={<Login />}></Route>
            <Route path={USER_PROFILE_PATH} element={<UserProfile />}></Route>
            <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />}></Route>
            <Route path={PASSWORD_CREATE_PATH} element={<PasswordCreate />}></Route>
            <Route path={MEMBER_CREATE_PATH} element={<MemberCreate />}></Route>
            <Route path={LENDINGS_PATH} element={<Lendings />}></Route>
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;