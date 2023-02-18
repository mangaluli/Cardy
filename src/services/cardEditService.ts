import Card from "../interfaces/Card";
import { addCard, deleteCard, editCard, getCard } from "./cardsService";
import { editUser, getUser } from "./usersService";

export async function createCard(card: Card, userId: number) {
  try {
    const addCardRes = await addCard(card);
    const cardId = addCardRes.data.id;
    const userRes = await getUser(userId);
    const user = userRes.data[0];
    user.cardIds.push(cardId);
    await editUser(user);
  }
  catch (err) { console.log(err) }
}

export async function deleteCardById(cardId: number) {
  try {
    //fetch card before deleting it for later referencing
    const cardRes = await getCard(cardId);
    const card = cardRes.data[0];
    await deleteCard(cardId);

    //fetch owner and splice the cardId from owner.cardIds
    const ownerRes = await getUser(card.info.ownerId);
    const owner = ownerRes.data[0];
    owner.cardIds.splice(owner.cardIds.indexOf(cardId), 1);
    await editUser(owner);

    //fetch each user whos id is included in card.info.lovedByUserIds and splice the cardId from user.lovedCardIds
    const lovedByUserIds = card.info.lovedByUserIds;
    if (lovedByUserIds && lovedByUserIds.length > 0) {
      lovedByUserIds.forEach(async (userId: number) => {
        const userRes = await getUser(userId);
        const user = userRes.data[0];
        user.lovedCardIds.splice(user.lovedCardIds.indexOf(cardId), 1);
        await editUser(user);
      })
    }
  }
  catch (err) { console.log(err) }
}

export async function loveCard(cardId: number, userId: number) {
  try {
    const cardRes = await getCard(cardId);
    const card = cardRes.data[0];
    card.info.lovedByUserIds.push(userId);
    editCard(card);

    const userRes = await getUser(userId);
    const user = userRes.data[0];
    user.lovedCardIds.push(cardId);
    editUser(user);
  }
  catch (err) { console.log(err) }
}

export async function unloveCard(cardId: number, userId: number) {
  try {
    const cardRes = await getCard(cardId);
    const card = cardRes.data[0];
    card.info.lovedByUserIds.splice(card.info.lovedByUserIds.indexOf(userId), 1);
    editCard(card);

    const userRes = await getUser(userId);
    const user = userRes.data[0];
    user.lovedCardIds.splice(user.lovedCardIds.indexOf(cardId), 1);
    editUser(user);
  }
  catch (err) { console.log(err) }
}