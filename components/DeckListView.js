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
import { getDeckList, recieveDeckList } from '../actions';
import { purple, white, green } from '../utils/colors'

class DeckListView extends React.Component {

  componentDidMount = () => {
    this.props.getAllDecksList()
  }

  render() {
    const {deckList} = this.props;
    return (
      <View style={styles.container}>
        { _.isEmpty(deckList) &&
          <View>
            <Text> No Decks Added </Text>
            <Text> Please add a deck </Text>
          </View> }

        { !_.isEmpty(deckList) &&
          <View>
            <Text> My Decks </Text>
            <FlatList
              data={deckList}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return(
                  <View style={styles.row}>
                    <Text>{item.title}</Text>
                    <Text> (0) Cards </Text>
                  </View>
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
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  row: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    flex: 1,
    height: 45
  },
});

const mapDispatchToProps = dispatch => ({
  getAllDecksList: () => dispatch(getDeckList())
});

const mapStateToProps = state => {
  console.log("state : ", _.orderBy(state.decks, ['timeStamp'], ['desc']));
  return {
    deckList : _.orderBy(state.decks, ['timeStamp'], ['desc'])
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
