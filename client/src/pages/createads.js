import React, { useState, useRef, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import axios from 'axios'
import { createAds } from "../redux/actions/profile";
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from "react-router";
import Posts from "../components/ProfilePost";
const  CreateAds = () => {
  const {auth} = useSelector(state => state)
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [radius,setRadius]=useState(0)
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");
  const [value, setValue] = useState(null);
  const [files,setFiles]=useState()
  console.log(value)

  const dispatch = useDispatch()
  const history=useHistory()
  if(auth.user.role==='student')
  {
    history.push('/')
  }

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    setFiles(e.target.files)
    let err = "";
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = "file does not exist");
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Select png or Jpeg format");
      }

      return newImages.push(file);
    });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(images)

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;
    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    if(tracks!==undefined){
      tracks.stop();
    }
    setStream(false);

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(images.length===0)
    return console.log("Please add an image")
    else{
        const formData=new FormData()
        console.log(files)
        var j=0
        for(let i of images)
        {
            formData.append('file'+j,i)
            console.log(i)
            j++
        }
        formData.append('content',content)
        console.log("this is formdata",formData)
        dispatch(createAds({formData,value,radius,auth}))

    }
    setContent();
    setImages([]);
    setValue()


  };

  console.log("here")
  
  let Text;
if(auth.details!==undefined&&auth.details.isUserPaid.length===0)
{
Text= <h1>Buy Plans to post Ads</h1>
}
else{
 Text= <>
 <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h3 className="m-0">Create Advertiesment</h3>

        </div>
        <div className="status_body">
          <textarea
            name="content"
            placeholder={`what is the Ad about`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                <img
                  src={
                    img.camera
                      ? img.camera
                      : img.url
                      ? img.url
                      : URL.createObjectURL(img)
                  }
                  alt="images"
                  className="img-thumbnail"
                />
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>
          {stream && (
            <div className="stream position-relative">
              <video
                src=""
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
              />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}
          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                {/* <i className="fas fa-camera" onClick={handleStream} /> */}
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={handleChangeImages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <h6>Select location</h6>
        <GooglePlacesAutocomplete
      apiKey="AIzaSyB_dTh5gK_Jw0K-Snt7CG84DarcmxnAOOA"
      selectProps={{
        value,
        onChange: setValue,
      }}
    />
        <h6>Set the range in kilometer to show ads</h6>
        <input type="number" onChange={(e)=>setRadius(e.target.value)}/>
        <div className="status_footer ">
          <button className="btn followBtn w-50">Post</button>
        </div>
      </form>
    </div>
 
 <Posts/>
 
 </>}
  
  
  return(
    Text
  )
    
};


export default CreateAds