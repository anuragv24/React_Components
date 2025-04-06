import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

// import Index from './Components/Accordian'
// import Index from "./Components/Color_Generator";
import Rating from "./Components/StarRating/Index";
import ImageSlider from "./Components/04Image_Slider/Index";
import LoadButton from "./Components/05Load_More_Buttom";
import Menu from "./Components/06menu";
import menus from "./Components/06menu/data";
import Home from "./Components/..Spline/SplineFile";
function App() {
  return (
    <>
      {/* Accordian */}
      {/* <Index/> */}

      {/* Random Color */}
      {/* <Index/> */}
      {/* rating */}
      {/* <Rating numOfStar ={10}/> */}
      {/* ImageSlider */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={"10"} page={'2'}/> */}
      {/* <LoadButton/> */}
      {/* <Menu menus={menus}/> */}
      <Home/>
    </>
  );
}

export default App;
