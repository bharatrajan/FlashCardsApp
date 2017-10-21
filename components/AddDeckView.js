import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, AsyncStorage, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck, getDeckList } from '../actions';
import util from '../utils'
import _ from 'lodash';
import { NavigationActions } from 'react-navigation'
import { purple, white, green, pink, red } from '../utils/colors'

class AddDeckView extends React.Component {

  state = {
    isValid : true,
    isDuplicateTitle : false,
  }

  componentDidMount = () => {
    this.props.getAllDecksList()
  }

  onPress = () => {
    const {text, isValid, isDuplicateTitle} = this.state;
    const {decks} = this.props;
    if(!text){
      this.setState({
        isValid : false,
        isDuplicateTitle : false,
      })
      return;
    }else if(!_.isEmpty(decks[text.toLowerCase()])){
      this.setState({
        isValid : true,
        isDuplicateTitle : true
      })
      return;
    }else{
      this.props.addDeck({
        id : util.uuid(),
        timeStamp: new Date().getTime(),
        title: util.capitalizeFirstLetter(text),
      });
      this.setState({
        isValid : true,
        text : "",
        isDuplicateTitle : false,
      });
      this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeckView'}))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> ADD A TITLE </Text>
        <View style={styles.inputBoxWrapper}>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />

          {!this.state.isValid &&
            <Text style={styles.validationText}>Enter valid title</Text>
          }

          {this.state.isDuplicateTitle &&
            <Text style={styles.validationText}>Title already exists</Text>
          }
        </View>
        <TouchableOpacity
          style={styles.SubmitBtn}
          onPress={this.onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
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
    fontSize: 22,
    textAlign: 'center',
  },
  inputBoxWrapper:{
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  inputBox:{
    height: 40,
    width: '60%',
    borderColor: '#E5E5E5',
    borderRadius: 3,
    borderWidth: 1
  },
  validationText: {
    color: pink,
  },
  SubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  addDeck: deck => dispatch(addDeck(deck)),
  getAllDecksList: () => dispatch(getDeckList())
});

const mapStateToProps = state => {
  let decks = {};
  state.decks.forEach(deck => decks[deck.title.toLowerCase()] = deck);
  return {decks};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckView)
