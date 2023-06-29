
const express = require('express');

const memberRoutes = require('./member-routes');
const bookRoutes = require('./book-routes');
const librarianRoutes = require('./librarian-routes');
const adminRoutes = require('./admin-routes');
const genreRoutes = require('./genre-routes');
const authorRoutes = require('./author-routes');
const bookGenreRoutes = require('./book-genre-routes');
const userRoutes = require('./user-routes');
const lendingRoutes = require('./lending-routes');

const router = express.Router();

router.use('/member', memberRoutes);
router.use('/book', bookRoutes);
router.use('/librarian', librarianRoutes);
router.use('/admin', adminRoutes);
router.use('/genre', genreRoutes);
router.use('/author', authorRoutes);
router.use('/book-genre', bookGenreRoutes);
router.use('/user', userRoutes);
router.use('/lending', lendingRoutes);

module.exports = router;
