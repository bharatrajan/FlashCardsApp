import { AsyncStorage } from 'react-native'
import { ACTIONS_ENUM } from './actionList'

export function recieveDeckList (deckList) {
  return {
    type: ACTIONS_ENUM.RECIEVE_DECK_LIST,
    deckList
  }
}

export function recieveCardList (cardList) {
  return {
    type: ACTIONS_ENUM.RECIEVE_CARD_LIST,
    cardList
  }
}

export const getDeckList = () => dispatch => {
  AsyncStorage.getItem('deckList').then(deckListAsString =>
    dispatch(recieveDeckList(JSON.parse(deckListAsString)))
  );
}

export const getCardList = () => dispatch => {
  AsyncStorage.getItem('cardList').then(cardListAsString => {
    return dispatch(recieveCardList(JSON.parse(cardListAsString)))
  });
}

export const addDeck = (deck) => dispatch => {
  AsyncStorage.getItem('deckList').then(deckListAsString =>{
    let deckList = JSON.parse(deckListAsString) || [];
        //deckList = [];
        deckList.push(deck);
        deckList = JSON.stringify(deckList);
    AsyncStorage.setItem('deckList', deckList).then(() =>{
      return dispatch(recieveDeckList(JSON.parse(deckList)))
    })
  });
}

export const addQuestion = (card) => dispatch => {
  AsyncStorage.getItem('cardList').then(cardListAsString =>{
    let cardList = JSON.parse(cardListAsString) || [];
        //cardList = [];
        cardList.push(card);
        cardList = JSON.stringify(cardList);
    AsyncStorage.setItem('cardList', cardList).then(() =>{
      return dispatch(recieveCardList(JSON.parse(cardList)))
    })
  });
}

export const deleteDeck = (deckId) => dispatch => {
  AsyncStorage.getItem('deckList').then(deckListAsString =>{
    let deckList = JSON.parse(deckListAsString) || [];
    let newList = deckList.filter(deck => deck.id !== deckId);
        newList = JSON.stringify(newList);
    AsyncStorage.setItem('deckList', newList).then(() =>{
      return dispatch(recieveDeckList(JSON.parse(newList)))
    });
  });
}

export const deleteQuestion = (cardId) => dispatch => {
  AsyncStorage.getItem('cardList').then(cardListAsString =>{
    let cardList = JSON.parse(cardListAsString) || [];
    let newList = cardList.filter(card => card.id !== cardId);
        newList = JSON.stringify(newList);
    AsyncStorage.setItem('cardList', newList).then(() =>{
      return dispatch(recieveCardList(JSON.parse(newList)))
    })
  });
}

export const resetScore = () => dispatch => {
    AsyncStorage.setItem('score', '0').then(() =>{
      return dispatch(recieveScore(0))
    })
}

export const incrementScore = () => dispatch => {
  AsyncStorage.getItem('score')
    .then( parseInt )
    .then( score => {
        score++;
        AsyncStorage.setItem('score', score.toString())
        .then(() => dispatch(recieveScore(score)))
    })
}



export function recieveScore (score) {
  return {
    type: ACTIONS_ENUM.RECIEVE_SCORE,
    score
  }
}
