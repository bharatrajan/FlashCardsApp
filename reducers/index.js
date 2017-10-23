import { ACTIONS_ENUM } from '../actions'
import { combineReducers } from 'redux';

let mainState = {
  deckList: [],
  cards: [],
  score: 0,
};

function decksReducer (deckList = mainState.deckList, action) {
  switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_DECK_LIST :
      deckList = action.deckList || [];
      return deckList.filter(item => true);

    default :
      return deckList
  }
}

function cardsReducer (cards = mainState.cards, action) {
  switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_CARD_LIST :
      cards = action.cardList || [];
      return cards.filter(item => true);

    default :
      return cards
  }
}


function scoreReducer (score = mainState.score, action) {
  switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_SCORE :
      newScore = action.score;
      return newScore;

    default :
      return score
  }
}

export default combineReducers({
  decks: decksReducer,
  cards: cardsReducer,
  score: scoreReducer,
});
