import React from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Certificate = ({ data, st }) => {
  const dispatch = useDispatch()
  console.log(data)
  return (
    <div style={{ display: `${st}` }}>
      <div className="inn-ctn-box mt-4 mb-5">
        <h2>Certification </h2>
        <hr />

        <div className="cert-box">
          {(data.certification &&
            data.certification.map((cer) => (
              <div className="media" key={cer._id}>
                {}
                {/* <i className="fa fa-certificate mr-3" aria-hidden="true"></i> */}
                <img
                   onClick={ ()=>dispatch({
                    type: GLOBALTYPES.USERLIST,
                    payload: { show: true, userdata:cer.file,image: true },
                  })} 
                    src={cer.file ? (cer.file.split('.').pop()==='pdf'?'/images/pdfs.png':cer.file) : "images/event-pic.jpg"}
                    className="mr-4 img-fluid"
                  style={{ height: 100 }}
                  alt="..."
                />
                <div className="media-body">
                  <h5 className="mt-0">{cer.certificate}</h5>

                  <p>{cer.details}</p>
                </div>
              </div>
            ))) ||
            null}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
