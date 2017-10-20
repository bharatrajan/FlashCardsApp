import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, AsyncStorage, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions';
import util from '../utils'
import { NavigationActions } from 'react-navigation'

class AddDeckView extends React.Component {

  state = {
    isValid : true
  }

  onPress = () => {
    const {text, isValid} = this.state;
    if(!text){
      this.setState({
        isValid : false
      })
      return;
    }else{
      this.props.addDeck({
        title: text,
        id : util.uuid(),
        timeStamp: new Date().getTime(),
      })
      //this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeckView'}))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> TITLE </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        {!this.state.isValid &&
          <Text style={styles.validationText}>Enter valid title</Text>
        }

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
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
    justifyContent: 'center',
  },
  inputBox:{
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1
  },
  validationText: {

  },
  iosSubmitBtn:{

  },
  AndroidSubmitBtn:{

  },
  submitBtnText: {

  }
});

const mapDispatchToProps = dispatch => ({
  addDeck: deck => dispatch(addDeck(deck))
});

export default connect(null, mapDispatchToProps)(AddDeckView)
