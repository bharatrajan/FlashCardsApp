import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import util from '../utils';
import { getDeckList, getCardList, resetScore } from '../actions';
import { coolGrey, white } from '../utils/colors';

/**
* @description - Displays the list of Desk list
* @component
*/
class DeckListView extends React.Component {

  /**
  * @description - State object carrying validation booleans
  */
  state = {
      showActivityIndicator : true
  }

  /**
  * @description - Gets all the Decks from AsyncStorage
  * @description - Gets all the Cards from AsyncStorage
  * @description - Initiates score in AsyncStorage
  * @description - Initiates ActivityIndicator for 1 sec
  * @lifeCycle
  * @returns null
  */
  componentDidMount = () => {
      setTimeout(() => {
          this.setState({
              showActivityIndicator : false
          });
      }, 1000);
      this.props.resetScore();
      this.props.getCardList();
      this.props.getAllDecksList();
  }

  /**
  * @description - On-deck-press event listener.
  * @description - Navigates to the SingleDeck screen
  * @eventListener
  * @returns null
  */
  onPress = (deck) =>
      this.props.navigation.navigate('SingleDeck',{ deck });

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      const {deckList, cardList, score} = this.props;
      const { showActivityIndicator } = this.state;

      if(showActivityIndicator){
          return(
              <View style={styles.container}>
                  <View style={styles.center}>
                      <ActivityIndicator/>
                  </View>
              </View>
          );
      }else{
          return (
              _.isEmpty(deckList) ?
                  <View style={styles.container}>
                      <View style={styles.center}>
                          <Text> No Decks added </Text>
                          <Text> Please add a Deck </Text>
                      </View>
                  </View>
                  :
                  <View style={styles.container}>
                      <View style={{height:'100%'}}>
                          <View style={styles.header}>
                              <Text style={styles.title}> MY DECKS </Text>
                              <Text style={styles.score}> Score : {score} </Text>
                          </View>
                          <FlatList
                              data={deckList}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => {
                                  return(
                                      <TouchableOpacity
                                          style={styles.row}
                                          onPress={() => this.onPress(item)}>
                                          <View style={styles.deckRow}>
                                              <Text style={styles.deckTitleText}> {item.title}</Text>
                                              <Text style={styles.deckCardText}>  {util.getCardCounts(item.id, cardList)}</Text>
                                          </View>
                                      </TouchableOpacity>
                                  );
                              }}
                          />
                      </View>
                  </View>
          );}
  }
}

/**
* @description - Style object
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 6,
        backgroundColor: coolGrey,
    },
    center:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        maxHeight: 50,
        minHeight: 50,
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    title:{
        fontSize: 25,
        fontWeight: '200',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score:{
        fontSize: 20,
        fontWeight: '300',
    },
    row: {
        shadowOffset:{
            width: 2,
            height: 2,
        },
        shadowColor: 'rgba(0,0,0,.16)',
        shadowOpacity: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: 85,
        width: '100%',
        backgroundColor: white,
        margin: 2.5,
        borderRadius: 7,
    },
    deckRow:{
        flex: 1,
        paddingLeft: 5,
        alignItems: 'flex-start',
    },
    deckTitleText: {
        fontSize: 17.5,
        fontWeight: '300',
    },
    deckCardText: {
        fontSize: 11,
        fontWeight: '600'
    }
});

/**
* @description - Maps action dispatchers to props of this component
* @callBack
* @param {object} dispatch - dispatch from store
* @returns object containing dispatchers
*/
const mapDispatchToProps = dispatch => ({
    resetScore: () => dispatch(resetScore()),
    getCardList: () => dispatch(getCardList()),
    getAllDecksList: () => dispatch(getDeckList())
});

/**
* @description - Maps updated state to props of this component
* @callBack
* @param {object} state - state from store
* @returns object with updated score, cardList, deckList
*/
const mapStateToProps = state => {
    return {
        score : state.score,
        cardList : state.cards,
        deckList : _.orderBy(state.decks, ['timeStamp'], ['desc'])
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);
