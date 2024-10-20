import axios from "axios";

const base_url = "https://employee-server-tg36.onrender.com"; 

export const addemployeeApi = async (data) => {
  return await axios.post(`${base_url}/addemp`, data);
}

export  const getemployeeApi=async()=>{
  return await axios.get(`${base_url}/employees`)
}
export const deleteEmployeeApi=async(id)=>{
  return await axios.delete(`${base_url}/dltemp/${id}`)
}

export const UpdateEmployeeApi = async (data, id) => {
  return await axios.put(`${base_url}/updateemp/${id}`,data);
  
};