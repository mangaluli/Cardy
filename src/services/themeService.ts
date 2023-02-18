import axios from "axios";
import { Theme } from "../interfaces/Theme";


const api: string = process.env.REACT_APP_API + '/themes' || '';

export function addTheme(theme: Theme) {
  return axios.post(api, theme);
}

export function editTheme(theme: Theme) {
  return axios.put(`${api}/${theme.id}`, theme);
}

export function getTheme(themeId: number) {
  return axios.get(`${api}?id=${themeId}`);
}

export function deleteTheme(themeId: number) {
  return axios.delete(`${api}/${themeId}`);
}

export function getThemes() {
  return axios.get(`${api}`);
}