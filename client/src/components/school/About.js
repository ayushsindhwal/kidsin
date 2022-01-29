import React from "react";

const About = ({ about, st }) => {
  return (
    <div style={{ display: `${st}` }} className="inn-ctn-box mt-4 mb-5 box-pgn">
      <h2>About</h2>
      <hr />
      <p>{about}</p>
    </div>
  );
};

export default About;
