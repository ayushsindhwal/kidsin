import axios from "axios";
import { postDataAPI } from "./fetchData";

export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "file does not exist");
  if (file.size > 1024 * 1024)
    //1mb
    err = "Upload file upto 1 mb";
};

export const imageUpload = async (images,auth) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }
    formData.append("upload_preset", "nfp8ghae");
    formData.append("cloud_name", "dzf4tpuya");

    // const res = await fetch(
    //   "https://api.cloudinary.com/v1_1/dzf4tpuya/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );

    const res=await axios.post('/api/mediaupload',formData,{
      headers: { Authorization: auth.token,
        'content-type':'multipart/form-data'

      },
    })
    console.log(res)
    console.log('hello',res.data.secure_url)
    imgArr.push({url: res.data.secure_url });
  }
  return imgArr;
};
