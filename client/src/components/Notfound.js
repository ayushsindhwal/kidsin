import React from "react";
import { Link, useParams } from "react-router-dom";
import * as containerStyles from "./Notfound.module.css";

const Notfound = () => {
  const { page, id } = useParams();

  return page === "search" ? null : (
    <div>
      <div className={containerStyles.mainbox}>
        <div className={containerStyles.err}>4</div>
        <i className={`${containerStyles.far} fa-question-circle fa-spin`}></i>
        <div className={containerStyles.err2}>4</div>
        <div className={containerStyles.msg}>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go{" "}
            <Link className={`${containerStyles.as}`} to="/">
              home
            </Link>{" "}
            and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
