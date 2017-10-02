import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'Udaciflashcards';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
}

export function getDeck(name) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(decks => JSON.parse(decks)[name]);
}

export function saveDeckTitle(name) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [name]: {
      title: name,
      questions: [],
    }
  }))
}

export function addCardToDeck(name, card) {
  return getDeck(name).then(deck => {
    let oldDeck = deck;
    oldDeck.questions.push(card);
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [oldDeck.title]: {
        title: oldDeck.title,
        questions: oldDeck.questions,
      }
    }))
  });
}
