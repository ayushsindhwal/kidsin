import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

// post

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

// update

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

//deleteData
export const deleteDataAPI = async (url, token, data) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token, id: data },
  });
  return res;
};
