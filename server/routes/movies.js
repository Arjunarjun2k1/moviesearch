const router = require('express').Router()
const {getMoviesBySearchData,addToFavourites,getFavouriteMovies} = require('../controllers/movieController')

router.get('/search',getMoviesBySearchData)

router.post('/favourites',addToFavourites)

router.get('/favouritesList',getFavouriteMovies)

module.exports = router