import axios from "axios";

const API =
"https://cloud-storage-api-f7em.onrender.com/api/files";

const getToken = () => {

  return localStorage.getItem(
    "token"
  );

};

export const uploadFile =
async (formData) => {

  const response =
  await axios.post(

    `${API}/upload`,

    formData,

    {
      headers: {
        Authorization:
        `Bearer ${getToken()}`
      }
    }

  );

  return response.data;

};

export const getFiles =
async () => {

  const response =
  await axios.get(

    API,

    {
      headers: {
        Authorization:
        `Bearer ${getToken()}`
      }
    }

  );

  return response.data;

};

export const deleteFile =
async (id) => {

  const response =
  await axios.delete(

    `${API}/${id}`,

    {
      headers: {
        Authorization:
        `Bearer ${getToken()}`
      }
    }

  );

  return response.data;

};

export const searchFiles =
async (keyword) => {

  const response =
  await axios.get(

    `${API}/search?search=${keyword}`,

    {
      headers: {
        Authorization:
        `Bearer ${getToken()}`
      }
    }

  );

  return response.data;

};

export const getStats =
async () => {

  const response =
  await axios.get(

    `${API}/stats`,

    {
      headers: {
        Authorization:
        `Bearer ${getToken()}`
      }
    }

  );

  return response.data;

};