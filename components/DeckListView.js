import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Header,
  StyleSheet,
  Platform,
  AsyncStorage,
  FlatList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash';
import util from '../utils'
import { getDeckList, getCardList } from '../actions';
import { purple, white, green } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class DeckListView extends React.Component {

  componentDidMount = () => {
    this.props.getCardList()
    this.props.getAllDecksList()
  }

  onPress = (deck) =>
    this.props.navigation.navigate('SingleDeck',{ deck });


  render() {
    const {deckList, cardList} = this.props;
    return (
      <View style={styles.container}>
        { _.isEmpty(deckList) &&
          <View style={styles.defaultText}>
            <Text> No Decks added </Text>
            <Text> Please add a Deck </Text>
          </View> }

        { !_.isEmpty(deckList) &&
          <View>
            <Text style={styles.title}> MY DECKS </Text>
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
                )
              }}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 6,
    backgroundColor: '#E5E5E5',
  },
  defaultText:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 17.5,
    alignItems: 'center',
    paddingTop: 12.5,
    justifyContent: 'center',
    width: '100%',
    height: 50
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
    backgroundColor: '#FFF',
    margin: 2.5,
    borderRadius: 7,
  },
  deckRow:{
    flex: 1,
    alignItems: 'flex-start',
  },
  deckTitleText: {
    fontSize: 17.5
  },
  deckCardText: {
    fontSize: 11,
    fontWeight: "bold"
  }
});

const mapDispatchToProps = dispatch => ({
  getCardList: () => dispatch(getCardList()),
  getAllDecksList: () => dispatch(getDeckList())
});

const mapStateToProps = state => {
  console.log("state : ", state);
  return {
    cardCount : {},
    cardList : state.cards,
    deckList : _.orderBy(state.decks, ['timeStamp'], ['desc'])
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
