import { AsyncStorage } from 'react-native'

export const ACTIONS_ENUM = {
  'RECIEVE_DECK_LIST' : 'RECIEVE_DECK_LIST',
  'RECIEVE_CARD_LIST' : 'RECIEVE_CARD_LIST',
  'GET_DECK_LIST' : 'GET_DECK_LIST',
  'GET_CARD_LIST' : 'GET_CARD_LIST',
  'ADD_CARD' : 'ADD_CARD',
  'ADD_DECK' : 'ADD_DECK',
  'DELETE_CARD' : 'DELETE_CARD',
  'DELETE_DECK' : 'DELETE_DECK',
}

export function recieveDeckList (deckList) {
  return {
    type: ACTIONS_ENUM.RECIEVE_DECK_LIST,
    deckList
  }
}

export function recieveCardList () {
  return {
    type: ACTIONS_ENUM.RECIEVE_CARD_LIST
  }
}

export const getDeckList = () => dispatch => {
  AsyncStorage.getItem('deckList').then(deckListAsString =>
    dispatch(recieveDeckList(JSON.parse(deckListAsString)))
  );
}


export function getCardList () {
  return {
    type: ACTIONS_ENUM.GET_CARD_LIST
  }
}

export const addDeck = (deck) => dispatch => {
  AsyncStorage.getItem('deckList').then(deckListAsString =>{
    let deckList = JSON.parse(deckListAsString);
        deckList.push(deck);
        deckList = JSON.stringify(deckList);
    AsyncStorage.setItem('deckList', deckList).then(() =>{
      debugger
      return dispatch(recieveDeckList(JSON.parse(deckList)))
    })
  });
}

export function addQuestion () {
  return {
    type: ACTIONS_ENUM.ADD_QUESTION
  }
}


export function deleteDeck () {
  return {
    type: ACTIONS_ENUM.DELETE_DECK
  }
}

export function deleteQuestion () {
  return {
    type: ACTIONS_ENUM.DELETE_QUESTION
  }
}
