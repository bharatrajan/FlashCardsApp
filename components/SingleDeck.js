import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, AsyncStorage, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { getCardList } from '../actions';
import util from '../utils'
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { purple, white, green, pink, grey } from '../utils/colors'

class SingleDeck extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerRight: (
            <TouchableOpacity
              style={{paddingRight:10}}
              onPress={() => {
                navigation.setParams({"delete": new Date().getTime()})
              }}
            >
              <Ionicons name='ios-trash' size={28} color={white} />
            </TouchableOpacity>
       )
    }
  }

  componentWillUpdate = (newProps) => {
    if(this.props.navigation.state.params.delete !=
        newProps.navigation.state.params.delete)
          this.deleteDeck()
  }

  deleteDeck = () => {
    //TODO: Delete this Deck & cards
  }

  componentDidMount = () => {
    this.props.getCardList()
  }

  onStartQuizPress = () => {

  }

  onAddQuizPress = () => {
    this.props.navigation.navigate('AddQuiz',{ deck : this.props.deck });
  }

  render() {
    const {deck, quizes} = this.props
    if(!deck) return null;
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxWrapper}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text ></Text>
          <Text style={styles.subTitle}>{util.getCardCounts(deck.id, quizes)}</Text>
        </View>
        <View>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.onAddQuizPress}>
            <Text style={styles.submitBtnText}>ADD QUIZ</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={this.onStartQuizPress}>
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
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
  },
  subTitle:{
    fontSize: 15,
    fontWeight: 'bold',
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
