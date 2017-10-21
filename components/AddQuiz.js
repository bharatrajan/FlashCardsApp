import React, { Component } from 'react'
import { View,
         Text,
         StyleSheet,
         Platform,
         AsyncStorage,
         TouchableOpacity,
         Button,
         TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions';
import { FontAwesome } from '@expo/vector-icons'
import util from '../utils'
import _ from 'lodash';
import { NavigationActions } from 'react-navigation'
import { white, green, pink, grey, lightGrey } from '../utils/colors'

class AddQuiz extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: util.compressText(navigation.state.params.deck.title)
    }
  }

  addQuiz = () => {
    const {question, answer} = this.state;
    const isAnswerValid = !_.isEmpty(answer)
    const isQuestionValid = !_.isEmpty(question)

    if( isAnswerValid && isQuestionValid ){
      this.props.addQuestion({
        answer,
        question,
        id: util.uuid(),
        deckId: this.props.deckId,
      })
      this.setState({
        isQuestionValid : true,
        isAnswerValid : true,
        question: "",
        answer: "",
      })
      this.props.navigation.goBack()
    }else{
      this.setState({
        isAnswerValid,
        isQuestionValid
      })
    }
  }


  state = {
    isQuestionValid : true,
    isAnswerValid : true,
    question: "",
    answer: "",
  }

  render() {
    const {isQuestionValid, isAnswerValid} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxWrapper}>
          <TextInput
            style={styles.inputBox}
            numberOfLines={6}
            multiline={true}
            placeholder={"Question ..."}
            placeholderTextColor={grey}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
          />
          <Text style={styles.validationText}>{
              isQuestionValid ? "" : "Enter valid Question"
          }</Text>
        </View>

        <View style={styles.inputBoxWrapper}>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            placeholder={"Answer ..."}
            placeholderTextColor={lightGrey}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />

          <Text style={styles.validationText}>{
              isAnswerValid ? "" : "Enter valid Answer"
          }</Text>
        </View>

        <TouchableOpacity
          style={styles.SubmitBtn}
          onPress={this.addQuiz}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>

        <Text style={styles.validationText}></Text>
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
    backgroundColor: grey,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  inputBoxWrapper:{
    paddingTop: 15,
    alignItems: 'center',
    width: '100%',
    height: '45%',
  },
  inputBox:{
    backgroundColor: white,
    height: '70%',
    width: '90%',
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
  addQuestion: (quiz) => dispatch(addQuestion(quiz))
});

const mapStateToProps = (state, { navigation }) => {
  return {
    deckId : navigation.state.params.deck.id
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuiz)
