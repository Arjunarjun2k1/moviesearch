const fs = require('fs')
const axios = require('axios')

module.exports.getMoviesBySearchData = async(req,res)=>{
    try{
         const response = await axios.get(`${process.env.OMDBAPI}?s=${req.query.s}&apikey=${process.env.APIKEY}`)
         res.status(200).json(response.data)
    }catch(err){
        res.status(500).json({
            message:'Something went wrong'
        })
    }
}

module.exports.addToFavourites = async(req,res)=>{
    try{
        let {title,year,url} = req.body;

        let list =  fs.readFileSync(`${__dirname}/favouritesData.json`,'utf-8')
        
        let parsedList = JSON.parse(list)
        parsedList.push({title,year,url})

        await fs.writeFile(`${__dirname}/favouritesData.json`,JSON.stringify(parsedList),(err)=>{
             if(!err){
                res.status(200).json({
                    message:"Added to Favourites"
                })
             }
        })

    }catch(err){
        res.status(500).json({
            message:'Something went wrong'
        })
    }
}

module.exports.getFavouriteMovies = async(req,res)=>{
    try{
        let list = fs.readFileSync(`${__dirname}/favouritesData.json`,'utf-8')
                res.status(200).json({
                    data:JSON.parse(list)
                })
    }catch(err){
        res.status(500).json({
            message:'Something went wrong'
        })
    }
}