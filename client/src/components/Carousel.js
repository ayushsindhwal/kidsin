import React from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
const Carousel = ({ images, id,ads }) => {
  const dispatch = useDispatch()
  const isActive = (index) => {
    if (index === 0) return "active";
  };
  return (
    <div id={`image${id}`} className="carousel postcarousel slide" data-ride="carousel">
      <ol className="carousel-indicators" style={{display:`${images.length<=1?'none':'flex'}`}}>
        {images.map((img, index) => (
          <li
            data-target={`#image${id}`}
            data-slide-to={index}
            key={index}
            className={isActive(index)}
          />
        ))}
      </ol>
      <div className="carousel-inners carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item postcarousels  ${isActive(index)}`}>
            { 
              img.url!==undefined?(img.url.match(/video/i)
              ?<video  controls src={img.url} className="d-block w-100" alt={img.url} />

              :<img src={ads?img:img.url} className="d-block w-100" 
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.USERLIST,
                  payload: { show: true, userdata:img.url,image:true},
                })
              }
              alt={img.url} />):null

            }
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href={`#image${id}`}
        role="button"
        data-slide="prev"
        style={{display:`${images.length<=1?'none':'flex'}`}}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href={`#image${id}`}
        role="button"
        data-slide="next"
        style={{display:`${images.length<=1?'none':'flex'}`}}
      >
        <span       style={{display:`${images.length<=1?'none':'flex'}`}}
 className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"       style={{display:`${images.length<=1?'none':'flex'}`}}
>Next</span>
      </a>
    </div>
  );
};

export default Carousel;
