import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import SidebarStudentRight from "../components/SidebarStudentRight";
import { addInterest,deleteInterest } from "../redux/actions/profile";

const Interest = () => {
  const [interestId, setInterestKey] = useState();
  const [UserInterest, setUserInterest] = useState([]);
  const [interestlist, setinterest] = useState([]);
  const [AllInterest, setAllInterest] = useState([]);
  const { auth, interest } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    setinterest(auth.details !== undefined ? auth.details.interestData : []);
    setAllInterest(auth.user !== undefined ? auth.user.interest : []);
  }, [auth.details, auth.user.interest, interest, dispatch]);
  var interestOptions = [];

  if (interestlist !== undefined) {
    interestlist.map((names, i) =>
      interestOptions.push({
        key: names._id,
        value: names.name,
        text: names.name,
        any: names._id,
      })
    );
  }

  const handleOnchange = (e, data) => {
    for (let i of interestOptions) {
      if (data.value === i.value) {
        setInterestKey(i.key);
      }
    }
    setUserInterest(data.value);
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="inn-ctn-box mt-4">
          <h2>Interest</h2>
          <hr />
          <h4>Select Interest</h4>
          <Dropdown
            name="interest"
            onChange={handleOnchange}
            placeholder="Select interest"
            fluid
            search
            selection
            options={interestOptions}
          />
          <button
            onClick={() => dispatch(addInterest({ interestId, auth }))}
            className="followBtn"
          >
            Submit
          </button>
        </div>
        <div className="inn-ctn-box mt-4">
          <h2>Your Interest</h2>
          <hr />
          <div className="int-list interestlist">
            {AllInterest.map((row) => (
              <div
                key={row._id}
                className={"interestcss"}
              >
                <div>
                <img
                  src={row.interestimage}
                  className="mb-1 img-fluid"
                  alt="..."
                />
                                <i className="fas fa-times" style={{position:"absolute"}} onClick={()=>dispatch(deleteInterest({interestId:row._id,auth}))}></i>

                </div>
                <b>{row.name}</b>

              </div>
            ))}
          </div>
        </div>
      </div>
      <SidebarStudentRight />
    </div>
  );
};

export default Interest;
