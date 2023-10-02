import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from "axios";

const Favourites = ()=>{
    const [movieList,setMovieList] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_URL}favouritesList`)
            .then((data)=>{
                setIsLoading(false)
                if(data.data.data){
                    setMovieList(data.data.data)
                }else{
                    setMovieList([])
                }
            })
            .catch((err)=>{
                setIsLoading(false)
            })
    },[])
    return(
        <>
        <Typography textAlign={"center"} variant="h4">Favourites</Typography>
        {isLoading && <Typography sx={{my:5}} textAlign={"center"} variant="h5">Finding Movies</Typography> }

        <Grid container>
            <Grid item xs={2} />
            <Grid container item xs={8}>
                {movieList?.map((value)=>{
                    return(
                        <Grid item xs={6}>
                            <Card sx={{m:4,boxShadow:'none',border:'2px solid gray'}}>
                                <CardMedia 
                                    sx={{height:300}}
                                    image={value.url}
                                    title={value.title}
                                />
                                <CardContent>
                                    <Typography textAlign={"center"} variant="h5">{value.title}</Typography>
                                    <Typography textAlign={"center"} variant="body2">{value.year}</Typography>
                                </CardContent>
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

export default Favourites;