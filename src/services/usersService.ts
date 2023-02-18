import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + '/users' || '';

export function addUser(user: User) {
  return axios.post(api, user);
}

export function editUser(user: User) {
  return axios.put(`${api}/${user.id}`, user);
}

export function getUser(userId: number) {
  return axios.get(`${api}?id=${userId}`);
}

export function deleteUser(id: number) {
  return axios.delete(`${api}/${id}`);
}

export function loginUser(user: User) {
  return axios.get(`${api}?email=${user.email}&password=${user.password}`);
}

export async function checkIfEmailExists(email: string) {
  const res = await axios.get(`${api}?email=${email}`);
  return res.data.length > 0;
}