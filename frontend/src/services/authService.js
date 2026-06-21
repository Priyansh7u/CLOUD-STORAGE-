import axios from "axios";

const API =
"https://cloud-storage-api-f7em.onrender.com//api/auth";

export const register =
async(data)=>{

 const response =
 await axios.post(
  `${API}/register`,
  data
 );

 return response.data;

};

export const login =
async(data)=>{

 const response =
 await axios.post(
  `${API}/login`,
  data
 );

 return response.data;

};