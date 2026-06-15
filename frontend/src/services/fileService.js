import axios from "axios";

const API = "http://localhost:5000/api/files";

export const uploadFile = async (formData) => {
  const response = await axios.post(
    `${API}/upload`,
    formData
  );

  return response.data;
};

export const getFiles = async () => {
  const response = await axios.get(API);

  return response.data;
};

export const deleteFile = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};