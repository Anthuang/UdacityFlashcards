import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from './types';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}
