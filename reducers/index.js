import { combineReducers } from 'redux';
import { ACTIONS_ENUM } from '../actions/actionList';

/**
* @description - Default state object
*/
let mainState = {
    deckList: [],
    cards: [],
    score: 0,
};

/**
* @description - deckList reducer. Handles all deckList related actions
* @description - Updates the state for its subscriber
* @reducer
* @param {object} deckList - Object from actionDispatcher
* @param {object} action - Object from actionDispatcher
* @returns deckList object
*/
function decksReducer (deckList = mainState.deckList, action) {
    switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_DECK_LIST :
        deckList = action.deckList || [];
        return deckList.filter(item => true);

    default :
        return deckList;
    }
}

/**
* @description - cards reducer. Handles all cards related actions
* @description - Updates the state for its subscriber
* @reducer
* @param {object} cards - Object from actionDispatcher
* @param {object} action - Object from actionDispatcher
* @returns cards object
*/
function cardsReducer (cards = mainState.cards, action) {
    switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_CARD_LIST :
        cards = action.cardList || [];
        return cards.filter(item => true);

    default :
        return cards;
    }
}

/**
* @description - Score reducer. Handles all score related actions
* @description - Updates the state for its subscriber
* @reducer
* @param {integer} score - Object from actionDispatcher
* @param {object} action - Object from actionDispatcher
* @returns score integer
*/
function scoreReducer (score = mainState.score, action) {
    switch (action.type) {
    case ACTIONS_ENUM.RECIEVE_SCORE :
        newScore = action.score;
        return newScore;

    default :
        return score;
    }
}

export default combineReducers({
    decks: decksReducer,
    cards: cardsReducer,
    score: scoreReducer,
});
