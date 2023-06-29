import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { JWT, ROLE, LOGIN_PATH } from '../utils/constants';

const useStyles = makeStyles(() => ({
  title: {
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [user, setUser] = useState()

  const handleLogoutClick = (e) => {
    e.preventDefault()
    localStorage.removeItem(JWT)
    localStorage.removeItem(ROLE)
    setUser(null);
    navigate(LOGIN_PATH)
  }

  useEffect(() => {
    if (localStorage[JWT] && localStorage[ROLE]) {
      setUser({
        token: localStorage[JWT],
        role: localStorage[ROLE]
      });
    }
    else setUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage[JWT]]);


  return (
    <>
      <AppBar
        className='navbar'
        color='secondary'
        elevation={0}
        position='relative'
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            color='inherit'
            variant='h6'
            ml={10}
          >
            Library &nbsp;

            {(user) && (
              (user.role === process.env.REACT_APP_LIBRARIAN_ROLE || user.role === process.env.REACT_APP_ADMIN_ROLE)
                ? (
                  <>
                    <Button color='inherit' variant='text' component={Link} to={`/user/profile`}> Profile</Button>
                    <Button color='inherit' variant='text' component={Link} to={`/member-create`}> Create Member</Button>
                    <Button color='inherit' variant='text' component={Link} to={`/lendings`}> Lendings</Button>
                  </>
                )
                : <Button color='inherit' variant='text' component={Link} to={`/user/profile`}> Profile</Button>

            )
            }
          </Typography>
          <Typography mr={10}>
            {user
              ? <Button onClick={handleLogoutClick} color='inherit' variant='outlined'>Logout</Button>
              : <Button color='inherit' variant='outlined' component={Link} to={`/user/login`}>Login</Button>
            }
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar; 