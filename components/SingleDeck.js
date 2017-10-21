import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, AsyncStorage, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { getCardList } from '../actions';
import util from '../utils'
import _ from 'lodash';
import { NavigationActions } from 'react-navigation'
import { purple, white, green, pink, grey } from '../utils/colors'

class SingleDeck extends React.Component {

  componentDidMount = () => {
    this.props.getCardList()
  }

  getCardCounts = deckId => {
    let count = 0, {quizes} = this.props;
    quizes.forEach( quizes => {
      if(quizes.deckId === deckId) count++;
    })
    return count;
  }

  onStartQuizPress = () => {
  }

  onAddQuizPress = () => {
  }

  render() {
    const {deck} = this.props
    if(!deck) return null;
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxWrapper}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text ></Text>
          <Text style={styles.subTitle}>{this.getCardCounts(deck.id)} cards</Text>
        </View>
        <View>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.onPress}>
            <Text style={styles.submitBtnText}>ADD QUIZ</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={this.onPress}>
            <Text style={styles.whiteButtonText}>START QUIZ</Text>
        </TouchableOpacity>
        </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  title:{
    fontSize: 25,
    textAlign: 'center',
  },
  subTitle:{
    fontSize: 15,
    textAlign: 'center',
  },
  whiteButton:{
    backgroundColor: white,
    borderWidth: 1,
    borderColor: grey,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  whiteButtonText:{
    color: grey,
    fontSize: 22,
    textAlign: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  getCardList: () => dispatch(getCardList())
});

const mapStateToProps = (state, { navigation }) => {
  return {
    quizes : state.cards,
    deck : navigation.state.params.deck,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleDeck)
