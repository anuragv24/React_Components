import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]); //contains all image data
  const [current, setCurrentSlide] = useState(0); // current image
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(page)
  // const  []

  async function fetchImage(url) {
    setLoading(true);
    setError(null)
    setImages([])
    try {
      const response = await fetch(`${url}?page=${pageNum}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImage(url);
  }, [url, limit, pageNum]);

  const handlePrevious = () => {
    setCurrentSlide(current === 0 ? images.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrentSlide(current === images.length - 1 ? 0 : current + 1);
  };

  if (loading) {
    return <div>Loading data ! Please wait</div>;
  }

  if (error !== null) {
    return <div>Error Occured ! {error}</div>;
  }

  const prevPage = () => {
    setPageNum(pageNum - 1)
  }

  const nextPage = () => {
    setPageNum(+pageNum + 1)
  }
  // console.log(images);
  return (
    <>
      <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.author}
              className={
                current === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicator">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  current === index
                    ? "current-index"
                    : "current-index hide-current-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>

    <div id="1" style={{display:'flex', gap:'5px', alignItems:'center',justifyContent:'center'}}>
    <BsArrowLeftCircleFill onClick={prevPage}/>
    <h3 style={{padding:'5px 10px', borderRadius:'5px', backgroundColor:"gray",boxShadow:" 0px 0px 7px #666"}}>Page no : {pageNum}</h3>
    <BsArrowRightCircleFill onClick={nextPage}/>
    </div>
   
    </>
  );
}
