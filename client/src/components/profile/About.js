import React from "react";

const About = ({ st, data }) => {
  return (
    <div style={{ display: `${st}` }}>
      <div className="inn-ctn-box mt-4">
        <h2>About </h2>
        <hr />
        <p>{data.user !== undefined ? data.user.about : null}</p>
      </div>
      <div className="inn-ctn-box">
        <h2>Education </h2>
        <hr />
        {(data.education &&
          data.education.map((edu) => (
            <div className="media mb-4" key={edu._id}>
              <img
                src={
                  "/schoologo/" + (edu.profile)
                }
                className="mr-4"
                alt="..."
                style={{ width: "100px", height: "50px" }}
              />
              <div className="media-body">
                <h5 className="mt-0">{edu.school}</h5>

                <p>
                  Class-{edu.class_start} to {edu.class_end}
                </p>
                <p className="year-txt">
                  {edu.start_year} - {edu.end_year}
                </p>
              </div>
            </div>
          ))) ||
          null}
      </div>
    </div>
  );
};

export default About;
