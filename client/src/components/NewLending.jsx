import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { ApiContext } from "../context/apiContext";


import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import {
    FILTER_AUTHOR_BY_NAME_PATH, FILTER_GENRE_BY_NAME_PATH,
    FILTER_BOOK_BY_TITLE_PATH, FILTER_BOOKS_PATH, FILTER_MEMBER_BY_EMAIL_PATH,
    CREATE_LENDING_PATH, FORMAT_YEAR, GET_METHOD, POST_METHOD
} from "../utils/constants";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles(theme => ({
    filters: {
        display: "flex", flexDirection: "row", width: "80vw", alignItems: "center", margin: "15px", justifyContent: "center", paddingTop: "10px", paddingBottom: "10px"
    },
    divs: {
        marginRight: "5px",
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

function NewLendingModal(props) {
    const classes = useStyles();

    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);

    const [inputAuthorValue, setInputAuthorValue] = useState("");
    const [authorSuggestions, setAuthorSuggestions] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const [inputGenreValue, setInputGenreValue] = useState("");
    const [genreSuggestions, setGenreSuggestions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [inputBookValue, setInputBookValue] = useState("");
    const [bookSuggestions, setBookSuggestions] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [response, setResponse] = useState([]);

    const [bookPage, setBookPage] = useState(0);
    const [rowsPerBookPage, setRowsPerBookPage] = useState(0);
    const [totalBookItems, setTotalBookItems] = useState(0);

    const apiContext = React.useContext(ApiContext);

    const handleClose = () => {
        if (props.onClose) {
            setInputAuthorValue("");
            setSelectedAuthors([]);
            setInputBookValue("");
            setSelectedBooks([]);
            setInputGenreValue("");
            setSelectedGenres([]);
            setStartValue(null);
            setEndValue(null);
            setSelectedMember(null);
            setSelectedMemberId(null);
            setSelectedBookId(null);
            setButtonsDisabled(false);
            handleFilterButtonClick(0);
            props.onClose();
        }
    };

    const handleAuthorChange = async (event, value) => {
        const { value: inputVal } = event.target;
        setInputAuthorValue(inputVal);

        if (inputVal.length >= 3) {
            apiContext.fetchData(GET_METHOD, `${FILTER_AUTHOR_BY_NAME_PATH}${inputVal}`, {}).then(response => {
                if (response) {
                    const suggestionsArray = Array.isArray(response.data.data)
                        ? response.data.data
                        : [response.data.data];
                    const filteredAuthorArray = suggestionsArray.filter(x => !selectedAuthors.some(y => y.id === x.id))
                    setAuthorSuggestions(filteredAuthorArray);
                }
            })
        } else {
            setAuthorSuggestions([]);
        }
    };

    const handleGenreChange = async (event, value) => {
        const { value: inputVal } = event.target;
        // update the state of the component with the current value of the input field
        setInputGenreValue(inputVal);

        if (inputVal.length >= 3) {
            apiContext.fetchData(GET_METHOD, `${FILTER_GENRE_BY_NAME_PATH}${inputVal}`, {}).then(response => {
                if (response) {
                    const suggestionsArray = Array.isArray(response.data.data)
                        ? response.data.data
                        : [response.data.data];
                    const filteredGenreArray = suggestionsArray.filter(x => !selectedGenres.some(y => y.id === x.id))

                    // update the state of the component with the list of genres retrieved from the API
                    setGenreSuggestions(filteredGenreArray);
                }
            })
        } else {
            setGenreSuggestions([]);
        }

    };

    const handleBookChange = async (event, value) => {
        const { value: inputVal } = event.target;
        setInputBookValue(inputVal);

        if (inputVal.length >= 3) {
            apiContext.fetchData(GET_METHOD, `${FILTER_BOOK_BY_TITLE_PATH}${inputVal}`, {}).then(response => {
                if (response) {
                    const suggestionsArray = Array.isArray(response.data.data)
                        ? response.data.data
                        : [response.data.data];
                    const filteredBookArray = suggestionsArray.filter(x => !selectedBooks.some(y => y.id === x.id))
                    setBookSuggestions(filteredBookArray);
                }
            })
        } else {
            setBookSuggestions([]);
        }

    };



    const handleFilterButtonClick = async (page) => {
        const authorIds = selectedAuthors.map((author) => author.id);
        const genreIds = selectedGenres.map((genre) => genre.id);
        const bookTitleIds = selectedBooks.map((book) => book.id);
        // empty object which will hold the query parameters that will be sent to the server
        const queryParams = {};
        if (authorIds.length > 0) {
            // if exist add authorId key to the queryParams object and sets its value to the authorIds array
            queryParams.authorId = authorIds;
        }
        if (genreIds.length > 0) {
            queryParams.genreId = genreIds;
        }
        if (bookTitleIds.length > 0) {
            queryParams.bookTitleId = bookTitleIds;
        }
        if (startValue) {
            const startYear = startValue.format(FORMAT_YEAR);
            queryParams.startYear = startYear;
        }
        if (endValue) {
            const endYear = endValue.format(FORMAT_YEAR);
            queryParams.endYear = endYear;
        }

        const joinParams = (params) => {
            // used to get an array of all the keys in the myParams property of the queryParams object
            return Object.keys(params.params)
                // generate a new array of serialized key-value pairs
                .map((key) => {
                    // ensure that the value is always converted to an array before encoding
                    const values = Array.isArray(params.params[key]) ? params.params[key] : [params.params[key]];
                    // encode the key and value of each key-value pair (example: params.myArray is {foo: ['bar', 'baz']}, the resulting string would be foo=bar&foo=baz)
                    return encodeURIComponent(key) + '=' + values.map(encodeURIComponent).join('&' + encodeURIComponent(key) + '=');
                })
                .join('&');
        }

        const params = joinParams({ params: queryParams })

        apiContext.fetchData(GET_METHOD, `${FILTER_BOOKS_PATH}${page}&${params}`).then(response => {
            if (response) {
                setResponse(response.data.data.modelRows);
                setInputAuthorValue("");
                setSelectedAuthors([]);
                setInputBookValue("");
                setSelectedBooks([]);
                setInputGenreValue("");
                setSelectedGenres([]);
                setStartValue(null);
                setEndValue(null);
                setSelectedBookId(null);
                setButtonsDisabled(false);
                setBookPage(response.data.data.currentPage)
                setRowsPerBookPage(5)
                setTotalBookItems(response.data.data.totalItems)
            }
        })
    };

    const handleChangeBookPage = async (event, newPage) => {
        setBookPage(newPage);
        await handleFilterButtonClick(newPage);
    };

    function handleButtonClick(bookId) {
        if (bookId === selectedBookId) {
            setSelectedBookId(null);
            setButtonsDisabled(false);
        } else {
            setSelectedBookId(bookId);
            setButtonsDisabled(true);
        }
    }

    const handleMemberSelect = (event, value) => {
        setSelectedMember(value);
        setSelectedMemberId(value ? value.id : null);
    };

    const handleSearchByEmail = async (event, value) => {
        if (value) {
            apiContext.fetchData(GET_METHOD, FILTER_MEMBER_BY_EMAIL_PATH, {}).then(response => {
                if (response) setMembers(response.data.data.modelRows);
                else setMembers([]);
            })
        }
    };

    function handleNewLending() {
        const actionId = uuidv4();
        const lendingData = {
            memberId: selectedMemberId,
            bookId: selectedBookId,
            actionId: actionId,
        };

        apiContext.fetchData(POST_METHOD, CREATE_LENDING_PATH, lendingData).then(response => {
            if (response) {
                setSelectedMember(null);
                setSelectedMemberId(null);
                setSelectedBookId(null);
                setButtonsDisabled(false);
                handleClose();
            }
        })
    }

    useEffect(() => {
        handleFilterButtonClick(0);
    }, []);

    useEffect(() => {
        const lastSelectedAuthor = selectedAuthors[selectedAuthors.length - 1];
        if (lastSelectedAuthor) {
            const isDuplicate = selectedAuthors.some(
                (author) => author.id === lastSelectedAuthor.id && author !== lastSelectedAuthor
            );
            if (isDuplicate) {
                setSelectedAuthors(selectedAuthors.slice(0, -1));
                setInputAuthorValue("");
            }
        }
    }, [selectedAuthors]);

    // run every time selectedGenres changes
    useEffect(() => {
        const lastSelectedGenre = selectedGenres[selectedGenres.length - 1];
        if (lastSelectedGenre) {
            // check whether any of the other genres in the array have the same id as the last selected genre
            const isDuplicate = selectedGenres.some(
                (genre) => genre.id === lastSelectedGenre.id && genre !== lastSelectedGenre
            );
            if (isDuplicate) {
                // remove the last selected genre from the selectedGenres array 
                setSelectedGenres(selectedGenres.slice(0, -1));
                setInputGenreValue("");
            }
        }
    }, [selectedGenres]);

    useEffect(() => {
        const lastSelectedBook = selectedBooks[selectedBooks.length - 1];
        if (lastSelectedBook) {
            const isDuplicate = selectedBooks.some(
                (book) => book.id === lastSelectedBook.id && book !== lastSelectedBook
            );
            if (isDuplicate) {
                setSelectedBooks(selectedBooks.slice(0, -1));
                setInputBookValue("");
            }
        }
    }, [selectedBooks]);

    return (
        <div>
            <Modal
                open={props.open} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.filters}>
                        <div className={classes.divs}>
                            <Autocomplete
                                sx={{ width: "15vw" }}
                                multiple
                                id="tags-outlined"
                                options={authorSuggestions}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Author"
                                        placeholder="Select author"
                                        onChange={handleAuthorChange}
                                        value={inputAuthorValue}
                                    />
                                )}
                                onChange={(event, value) => {
                                    setInputAuthorValue("");
                                    setSelectedAuthors(value);
                                }}
                                value={selectedAuthors}
                            />
                        </div>
                        <div className={classes.divs}>
                            <Autocomplete
                                sx={{ width: "15vw" }}
                                multiple
                                id="tags-outlined"
                                options={bookSuggestions}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Title"
                                        placeholder="Select title"
                                        onChange={handleBookChange}
                                        value={inputBookValue}
                                    />
                                )}
                                onChange={(event, value) => {
                                    setInputBookValue("");
                                    setSelectedBooks(value);
                                }}
                                value={selectedBooks}
                            />
                        </div>
                        <div className={classes.divs}>
                            <Autocomplete
                                sx={{ width: "15vw" }}
                                multiple
                                id="tags-outlined"
                                options={genreSuggestions}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Genre"
                                        placeholder="Select genre"
                                        onChange={handleGenreChange}
                                        value={inputGenreValue}
                                    />
                                )}
                                onChange={(event, value) => {
                                    setInputGenreValue("");
                                    setSelectedGenres(value);
                                }}
                                value={selectedGenres}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className={classes.divs}>
                                <DatePicker
                                    views={['year']}
                                    maxDate={endValue}
                                    disableFuture
                                    label="Start Year"
                                    value={startValue}
                                    onChange={(newValue) => {
                                        setStartValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </div>
                            <div className={classes.divs}>
                                <DatePicker
                                    views={['year']}
                                    label="End Year"
                                    disableFuture
                                    minDate={startValue}
                                    value={endValue}
                                    onChange={(newValue) => {
                                        setEndValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </div>
                        </LocalizationProvider>
                        <Button variant="contained" sx={{ width: "12vw", height: "6vh" }} onClick={() => { handleFilterButtonClick(0) }}>Filter</Button>
                    </div>
                    <Table size='small' sx={{ marginTop: "50px" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Book Title</StyledTableCell>
                                <StyledTableCell>Author</StyledTableCell>
                                <StyledTableCell>Genre</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.map((book) => (
                                <StyledTableRow key={book.id}>
                                    <StyledTableCell>{book.title}</StyledTableCell>
                                    <StyledTableCell>{book.Author.name}</StyledTableCell>
                                    <StyledTableCell>{book.Genres.map(genre => genre.name)}</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        <Button
                                            size='small'
                                            color='inherit'
                                            variant='outlined'
                                            onClick={() => handleButtonClick(book.id)}
                                            disabled={buttonsDisabled && book.id !== selectedBookId}
                                        >
                                            {selectedBookId === book.id ? 'Unselect' : 'Select'}
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component='span'
                        count={totalBookItems}
                        page={bookPage}
                        onPageChange={handleChangeBookPage}
                        rowsPerPage={rowsPerBookPage}
                    />
                    <div className={classes.filters}>
                        <div className={classes.divs}>
                            <Autocomplete
                                sx={{ width: "30vw" }}
                                options={members}
                                getOptionLabel={(member) => member.User.email}
                                onChange={handleMemberSelect}
                                renderInput={(params) => (
                                    <TextField {...params} label="Member email"
                                        variant="outlined" />
                                )}
                                onInputChange={handleSearchByEmail}
                                value={selectedMember} />
                        </div>
                        <div className={classes.divs}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNewLending}
                            >
                                New Lending
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default NewLendingModal