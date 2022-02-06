import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { endrosedSkill } from "../../redux/actions/profile";

const Skills = ({ data, st }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ display: `${st}` }}>
      <div className="inn-ctn-box mt-4">
        <h2>Skills </h2>
        <hr />
        <ul className="skill-list">
          {(data.skill &&
            data.skill.map((skill, i) => (
              <li style={{ listStyle: "none" }} key={i}>
                <i
                  onClick={() =>
                    dispatch(endrosedSkill({ skillId: skill._id, auth }))
                  }
                  className={
                    skill.endrosedBy.filter((end) => end._id === auth.user._id)
                      .length !== 0
                      ? "fa fa-minus"
                      : "fa fa-plus"
                  }
                  aria-hidden="true"
                ></i>{" "}
                {skill.skill}
              </li>
            ))) ||
            null}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
