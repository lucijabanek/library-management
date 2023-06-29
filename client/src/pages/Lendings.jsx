import { useEffect, useState, useContext } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import Title from '../components/Title';
import { ApiContext } from "../context/apiContext";

import NewLendingModal from '../components/NewLending';

import {
  GET_METHOD, PUT_METHOD,
  ALL_LENDINGS, ALL_LENDINGS_PATH, IS_ACTIVE_QUERY,
  RETURN_BOOK_PATH
} from '../utils/constants';

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(7)
  },
  button: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
  },
  form: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3),
    color: theme.palette.common.black
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));


function Lendings() {
  const classes = useStyles();

  const [lendings, setLendings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [listedLendings, setListedLendings] = useState(ALL_LENDINGS);

  const apiContext = useContext(ApiContext);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    retrieveLendings(0, listedLendings);
  };

  const setResponseData = (response) => {
    setLendings(response.data.data.modelRows);
    setPage(response.data.data.currentPage);
    setRowsPerPage(10);
    setTotalItems(response.data.data.totalItems);
  };

  const retrieveLendings = async (page, isActive) => {
    if (isActive === ALL_LENDINGS) {
      apiContext.fetchData(GET_METHOD, `${ALL_LENDINGS_PATH}${page}`, {}).then(response => {
        if (response) setResponseData(response);
      });
    } else {
      apiContext.fetchData(GET_METHOD, `${ALL_LENDINGS_PATH}${page}${IS_ACTIVE_QUERY}${isActive}`, {}).then(response => {
        if (response) setResponseData(response);
      });
    }
  };

  const handleBookReturn = async (id) => {
    await apiContext.fetchData(PUT_METHOD, `${RETURN_BOOK_PATH}${id}`, {});

    await handleChangePage(undefined, page);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);

    await retrieveLendings(newPage, listedLendings);
  };

  const handleRadioButtonChange = async (event) => {
    setListedLendings(event.target.value);

    await retrieveLendings(0, listedLendings);
  };

  useEffect(() => {
    retrieveLendings(0, listedLendings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listedLendings]);

  return (
    <>
      <Container maxWidth='xl'>
        <div className={classes.title} >
          <Title>List of all lendings</Title>
        </div>
        <div className={classes.button} >
          <Button
            size='small'
            color='inherit'
            variant='outlined'
            onClick={handleOpenModal}
          >
            New Lending
          </Button>
          <NewLendingModal open={showModal} onClose={handleCloseModal} />
        </div>
        <div className={classes.form} >
          <FormLabel component="legend">Select available lendings</FormLabel>
          <FormControl component="fieldset" variant="standard">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="all-lendings"
              onChange={handleRadioButtonChange}
            >
              <FormControlLabel
                value="all-lendings"
                control={<Radio />}
                label="All lendings" />
              <FormControlLabel
                value='true'
                control={<Radio />}
                label="Active lendings" />
              <FormControlLabel
                value='false'
                control={<Radio />}
                label="Non-active lendings" />
            </RadioGroup>
          </FormControl>
        </div>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Email</StyledTableCell>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align='right'>Lent Date</StyledTableCell>
              <StyledTableCell align='right'>Expired Date</StyledTableCell>
              <StyledTableCell align='right'>Returned Date</StyledTableCell>
              <StyledTableCell align='right'>Late Fee (€)</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lendings.map((lending) => (
              <StyledTableRow key={lending.id}>
                <StyledTableCell>{lending.Member.User.email}</StyledTableCell>
                <StyledTableCell>{lending.Book.title}</StyledTableCell>
                <StyledTableCell align='right'>{lending.lentDate}</StyledTableCell>
                <StyledTableCell align='right'>{lending.expiredDate}</StyledTableCell>
                <StyledTableCell align='right'>{lending.returnedDate}</StyledTableCell>
                <StyledTableCell align='right'>{`${lending.lateFee} `}</StyledTableCell>
                <StyledTableCell align='right'>
                  {lending.isActive ? <Button
                    size='small'
                    color='inherit'
                    onClick={() => {
                      handleBookReturn(lending.id);
                    }}
                    variant='outlined'
                  >
                    Return Book
                  </Button> : <Button
                    size='small'
                    color='inherit'
                    variant='text'
                    disabled
                  >
                    Returned
                  </Button>}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='span'
          count={totalItems}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </Container>
    </>
  );
};

export default Lendings;