import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Search from "./Pages/Search";
import Favourites from "./Pages/Favourites";

function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Search/>} />
            <Route path="/favourites" element={<Favourites/>} /> 
         </Routes> 
      </BrowserRouter>
    </>
  )
   
}

export default App;
