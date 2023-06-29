import Typography from '@mui/material/Typography';

function Title(props) {
  return (
    <Typography component='h2' variant='h6' color='secondary' gutterBottom>
      {props.children}
    </Typography>
  );
}

export default Title;