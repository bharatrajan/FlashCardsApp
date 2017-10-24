import { AsyncStorage } from 'react-native';
import { ACTIONS_ENUM } from './actionList';

/**
* @description - Dispatches the action: RECIEVE_DECK_LIST
* @actionDispatcher
* @param {array} deckList - List of all decks
* @returns action-object
*/
export function recieveDeckList (deckList) {
    return {
        type: ACTIONS_ENUM.RECIEVE_DECK_LIST,
        deckList
    };
}

/**
* @description - Dispatches the action: RECIEVE_CARD_LIST
* @actionDispatcher
* @param {array} cardList - List of all quiz cards
* @returns action-object
*/
export function recieveCardList (cardList) {
    return {
        type: ACTIONS_ENUM.RECIEVE_CARD_LIST,
        cardList
    };
}

/**
* @description - Gets deckList from AsyncStorage(localStorage)
* @description - Pushes the deckList to recieveDeckList dispatcher
* @actionDispatcher
* @returns null
*/
export const getDeckList = () => dispatch => {
    AsyncStorage.getItem('deckList')
        .then(deckListAsString =>
            dispatch(recieveDeckList(JSON.parse(deckListAsString)))
        );
};

/**
* @description - Gets cardList from AsyncStorage(localStorage)
* @description - Pushes the cardList to recieveCardList dispatcher
* @actionDispatcher
* @returns null
*/
export const getCardList = () => dispatch => {
    AsyncStorage.getItem('cardList')
        .then(cardListAsString =>
            dispatch(recieveCardList(JSON.parse(cardListAsString)))
        );
};

/**
* @description - Adds a new deck to the deckList
* @description - New deck gets added to AsyncStorage
* @actionDispatcher
* @param {object} deck - deck object to be added
* @returns null
*/
export const addDeck = (deck) => dispatch => {
    AsyncStorage.getItem('deckList').then(deckListAsString => {
        let deckList = JSON.parse(deckListAsString) || [];
        deckList.push(deck);
        deckList = JSON.stringify(deckList);
        AsyncStorage.setItem('deckList', deckList)
            .then(() =>
                dispatch(recieveDeckList(JSON.parse(deckList)))
            );
    });
};

/**
* @description - Adds a new card to the cardList
* @description - New card gets added to AsyncStorage
* @actionDispatcher
* @param {object} card - card object to be added
* @returns null
*/
export const addQuestion = (card) => dispatch => {
    AsyncStorage.getItem('cardList').then(cardListAsString => {
        let cardList = JSON.parse(cardListAsString) || [];
        cardList.push(card);
        cardList = JSON.stringify(cardList);
        AsyncStorage.setItem('cardList', cardList)
            .then(() =>
                dispatch(recieveCardList(JSON.parse(cardList)))
            );
    });
};

/**
* @description - Deletes a deck to the deckList
* @description - Filtered deckList will be re-written in AsyncStorage
* @actionDispatcher
* @param {object} deck - deck object to be deleted
* @returns null
*/
export const deleteDeck = (deckId) => dispatch => {
    AsyncStorage.getItem('deckList').then(deckListAsString => {
        let deckList = JSON.parse(deckListAsString) || [];
        let newList = deckList.filter(deck => deck.id !== deckId);
        newList = JSON.stringify(newList);
        AsyncStorage.setItem('deckList', newList)
            .then(() =>
                dispatch(recieveDeckList(JSON.parse(newList)))
            );
    });
};

/**
* @description - Deletes a card to the cardList
* @description - Filtered cardList will be re-written in AsyncStorage
* @actionDispatcher
* @param {object} card - card object to be deleted
* @returns null
*/
export const deleteQuestion = (cardId) => dispatch => {
    AsyncStorage.getItem('cardList').then(cardListAsString => {
        let cardList = JSON.parse(cardListAsString) || [];
        let newList = cardList.filter(card => card.id !== cardId);
        newList = JSON.stringify(newList);
        AsyncStorage.setItem('cardList', newList)
            .then(() =>
                dispatch(recieveCardList(JSON.parse(newList)))
            );
    });
};

/**
* @description - Initiates score to {}
* @actionDispatcher
* @returns null
*/
export const resetScore = () => dispatch => {
    AsyncStorage.setItem('score', '{}')
        .then(() =>
            dispatch(recieveScore({}))
        );
};

/**
* @description - Increments score by 1 for a given deck
* @actionDispatcher
* @returns null
*/
export const incrementScore = (deckId) => dispatch => {
    AsyncStorage.getItem('score')
        .then( scoreObjAsString => {
            let scoreObj = JSON.parse(scoreObjAsString);
            scoreObj[deckId]++;
            AsyncStorage.setItem('score', JSON.stringify(scoreObj))
                .then(() => dispatch(recieveScore(scoreObj)));
        });
};

/**
* @description - Reset score for a specific deck
* @actionDispatcher
* @returns null
*/
export const resetScoreForDeck = (deckId) => dispatch => {
    AsyncStorage.getItem('score')
        .then( scoreObjAsString => {
            let scoreObj = JSON.parse(scoreObjAsString) || {};
            scoreObj[deckId] = 0;
            AsyncStorage.setItem('score', JSON.stringify(scoreObj))
                .then(() => dispatch(recieveScore(scoreObj)));
        });
};

/**
* @description - Dispatches the action: RECIEVE_SCORE
* @description - Publishes current score to subcribers
* @actionDispatcher
* @param {object} score - Current score
* @returns action-object
*/
export function recieveScore (score) {
    return {
        type: ACTIONS_ENUM.RECIEVE_SCORE,
        score
    };
}
