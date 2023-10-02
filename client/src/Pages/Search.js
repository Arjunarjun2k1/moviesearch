import React, { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";

const Search = ()=>{
    const [searchData,setSearchData] = useState('')
    const [movieList,setMovieList] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [favouritesadded,setFavouritesAdded] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    console.log(process.env)
    const handleChange = (e)=>{
        let {value} = e.target
        setSearchData(value)
    }

    useEffect(()=>{ 
        if(favouritesadded!=''){
            setTimeout(()=>{
                    setFavouritesAdded('')
            },2000)
        }
    },[favouritesadded])

    useEffect(()=>{
        let timeout;
        if(searchData!=''){
                 timeout = setTimeout(()=>{
                    setIsLoading(true)
                    setErrorMsg('')
                    axios.get(`${process.env.REACT_APP_API_URL}search?s=${searchData}`)
                    .then((data)=>{
                        setIsLoading(false)
                        if(data.data.Response==='True'){
                            setErrorMsg('')
                            setMovieList(data.data.Search)
                        }else{
                            setErrorMsg(data.data.Error)
                            setMovieList([])
                        }
                    })
                    .catch((err)=>{
                        setErrorMsg('Something went wrong')
                        setIsLoading(false)
                        setMovieList([])
                    })
                },[1500])
        }

        return()=>{
            clearTimeout(timeout)
        }
    },[searchData])

    const handleFavourites = (title,year,url)=>{
        let data = {title,year,url}
        axios.post(`${process.env.REACT_APP_API_URL}favourites`,data)
        .then((data)=>{
            setFavouritesAdded(data.data.message)
        })
        .catch(()=>{
            setFavouritesAdded('Something went wrong')
        })
    }
    return(
        <>
        <Box sx={{width:"100%",backgroundColor:"gray",display:'flex',justifyContent:'center'}}>
            <Box sx={{m:5}}>
                <OutlinedInput 
                    placeholder="Search ..." 
                    endAdornment={<SearchIcon/>} 
                    size="small" 
                    sx={{borderRadius:'50px',border:'1px solid #FFF',px:1,width:'300px'}} 
                    value={searchData}
                    onChange={handleChange}
                />
            </Box>
        </Box>
        {isLoading && <Typography sx={{my:5}} textAlign={"center"} variant="h5">Finding Movies</Typography> }
        {favouritesadded && <Typography sx={{my:5}} textAlign={"center"} variant="h5">{favouritesadded}</Typography> }
        {(searchData!=''  && errorMsg ) && <Typography sx={{my:5}} textAlign={"center"} variant="h5">{errorMsg}</Typography> }
        {searchData=='' && <Typography sx={{my:5}} textAlign={"center"} variant="h5">Enter something to search</Typography> }

        <Grid container>
            <Grid item xs={2} />
            <Grid container item xs={8}>
                {movieList?.map((value)=>{
                    return(
                        <Grid item xs={6}>
                            <Card sx={{m:4,boxShadow:'none',border:'2px solid gray'}}>
                                <CardMedia 
                                    sx={{height:300}}
                                    image={value.Poster}
                                    title={value.Title}
                                />
                                <CardContent>
                                    <Typography textAlign={"center"} variant="h5">{value.Title}</Typography>
                                    <Typography textAlign={"center"} variant="body2">{value.Year}</Typography>
                                </CardContent>
                                <CardActions sx={{display:'flex',justifyContent:'center'}}>
                                    <Button onClick={()=>handleFavourites(value.Title,value.Year,value.Poster)}  sx={{textTransform:"capitalize"}} variant="contained">Add to Favourites</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={2} />
        </Grid>
        
        </>
    )
}

export default Search;