import React, { Component } from 'react'
import { View,
         Text,
         StyleSheet,
         Dimensions,
         TouchableOpacity
       } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions';
import { FontAwesome } from '@expo/vector-icons'
import util from '../utils'
import _ from 'lodash';
import { white, green, pink, grey, lightGrey, red } from '../utils/colors'
import { Constants } from 'expo'

const screenDimensions = Dimensions.get('window');

class Quiz extends React.Component {
  state = {
      flip : true,
      hideClass : {}
  }

  flipCard = () =>
      this.setState((prevState) => {
        return {flip: !prevState.flip};
      });

  onCorrectPress = () => {
    this.props.onButtonPress()
    this.setState({
      hideClass : {display : 'none'}
    })
    //TODO : Update score
  }

  onIncorrectPress = () => {
    this.props.onButtonPress()
    this.setState({
      hideClass : {display : 'none'}
    })
  }

  render() {
    const {flip, hideClass} = this.state;
    const {answer, question} = this.props.quiz;
    return (
      <View style={[styles.container, hideClass]}>
      {flip &&
        <View>
          <Text style={styles.title}>{question}</Text>
          <Text ></Text>
          <TouchableOpacity onPress={this.flipCard}>
            <Text style={styles.subTitle}> Check Answer </Text>
          </TouchableOpacity>
        </View>
      }

      {!flip &&
        <View>
          <Text style={styles.title}>{answer}</Text>
          <Text ></Text>
          <TouchableOpacity onPress={this.flipCard}>
            <Text style={styles.subTitle}> Back to Question </Text>
          </TouchableOpacity>
        </View>
      }

        <View>
          <TouchableOpacity
            style={[styles.SubmitBtn, styles.correct]}
            onPress={this.onCorrectPress}>
              <Text style={styles.submitBtnText}> Correct </Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity
            style={[styles.SubmitBtn, styles.incorrect]}
            onPress={this.onIncorrectPress}>
              <Text style={styles.submitBtnText}> Incorrect </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  hide:{
    display : 'none',
  },
  container: {
    padding: 10,
    flex: 1,
    margin: 5,
    width: '97%',
    height: '90%',
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  title:{
    fontSize: 25,
    width: screenDimensions.width - 50,
    fontWeight: '200',
    textAlign: 'center',
  },
  subTitle:{
    fontSize: 15,
    color: red,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correct: {
    backgroundColor: green,
  },
  incorrect: {
    backgroundColor: pink,
  },
  SubmitBtn: {
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
  addQuestion: (quiz) => dispatch(addQuestion(quiz))
});

export default connect(null, mapDispatchToProps)(Quiz)
