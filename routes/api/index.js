const router = require('express').Router();
const usersRoutes = require('./user-route');
const thoughtsRoutes = require('./thought-route');


router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);


module.exports = router;