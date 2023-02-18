import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + '/cards' || '';

export function addCard(card: Card) {
  return axios.post(api, card);
}

export function editCard(card: Card) {
  return axios.put(`${api}/${card.id}`, card);
}

export function getCard(cardId: number) {
  return axios.get(`${api}?id=${cardId}`);
}

export function deleteCard(id: number) {
  return axios.delete(`${api}/${id}`);
}

export function getCards() {
  return axios.get(`${api}`);
}