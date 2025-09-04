import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './style.css'

export default function Rating({numOfStar = 5}) {
  const [rating, setRating] = useState(0);//deal with click
  const [hover, setHover] = useState(0);//deal with hover

  function handleClick(currentIndex) {
    // console.log("handleClick",currentIndex)
    setRating(currentIndex)
  }
  function handleMouseMove(currentIndex) {
    // console.log("move",currentIndex)
    setHover(currentIndex)
  }
  function handleMouseLeave() {
    setHover(rating)
  }
  return (
    <div className="star-rating">
      {
        [...Array(numOfStar)].map((_, index) => {
            index += 1 // index start with 0 but rating start with 1 therefore this
            return (
                <FaStar 
                key={index}
                className={index <= (hover || rating) ? "active" : "inactive"}
                onClick={() => handleClick(index)}
                onMouseMove={() => handleMouseMove(index)}
                onMouseLeave={() => handleMouseLeave()}
                size={40}
                />
            )
        })
      }
    </div>
  );
}
