import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { Redirect, useHistory } from "react-router-dom";
const Search = ({ match }) => {
  const [Search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (Search && auth.token) {
      getDataAPI(`search?fullname=${Search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
        });
      history.push("/search/" + Search);
    }
    return () => {};
  }, [Search, auth.token]);

  return (
    <>
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => setSearch(e.target.value)}
          input={Search}
        />
        <div style={{width:'30px',height:'33px',margin:'1px',padding:'5px'}} type="button" className="btn-primary">
        <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default Search;
