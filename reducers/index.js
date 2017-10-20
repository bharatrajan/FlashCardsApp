import { ACTIONS_ENUM } from '../actions'
import { combineReducers } from 'redux';

let mainState = {
  deckList: [],
  cards: []
};

function decksReducer (deckList = mainState.deckList, action) {
  switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_DECK_LIST :
      deckList = action.deckList || [];
      return deckList.filter(item => true);

    case ACTIONS_ENUM.GET_DECK_LIST :
     return [];

    case ACTIONS_ENUM.ADD_DECK :
      return {
        ...deckList,
      }
    case ACTIONS_ENUM.DELETE_DECK :
      return {
        ...deckList,
      }
    default :
      return deckList
  }
}

function cardsReducer (cards = mainState.cards, action) {
  switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_CARD_LIST :
      return {
        ...cards,
      }
    case ACTIONS_ENUM.GET_CARD_LIST :
      return {
        ...cards,
      }
    case ACTIONS_ENUM.ADD_CARD :
      return {
        ...cards,
      }
    case ACTIONS_ENUM.DELETE_CARD :
      return {
        ...cards,
      }
    default :
      return cards
  }
}


export default combineReducers({
  decks: decksReducer,
  cards: cardsReducer,
});
