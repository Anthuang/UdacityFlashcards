import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/types'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };

    case ADD_CARD:
      const { title, card } = action;
      oldDeck = {...state[title]};
      oldDeck.questions.push(card);

      return {
        ...state,
        [title]: oldDeck,
      };
      
    default :
      return state;
  }
}

export function selectDecks(decks) {
  return Object.values(decks).sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
}

export default decks;
