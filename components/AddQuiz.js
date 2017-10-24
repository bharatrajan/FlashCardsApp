import React from 'react';
import { View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import util from '../utils';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import { white, pink, grey, lightGrey, coolGrey } from '../utils/colors';

/**
* @description - Add quiz view.
* @component
*/
class AddQuiz extends React.Component {
  /**
  * @description - Sets heading for the current header
  * @callBack
  * @returns object containing title & right-icon
  */
  static navigationOptions = ({navigation}) => {
      return {
          title: util.compressText(navigation.state.params.deck.title),
          headerRight: (
              <TouchableOpacity
                  style={{paddingRight:10}}
                  onPress={() => {
                      navigation.setParams({'delete': new Date().getTime()});
                  }}
              >
                  <Ionicons name='md-add' size={28} color={white} />
              </TouchableOpacity>
          )
      };
  }

  /**
  * @description - Called everytime when props updates
  * @description - If navigation.state.params.delete changes,
  * @description - then calls delete method
  * @lifeCycle
  * @returns null
  */
  componentWillUpdate = (newProps) => {
      if(this.props.navigation.state.params.delete !=
        newProps.navigation.state.params.delete)
          this.addQuiz();
  }

  /**
  * @description - Submit button event listener.
  * @description - Contains validation, check for duplicate deck-name.
  * @description - Dispatches addQuiz action .
  * @eventListener
  * @returns null
  */
  addQuiz = () => {
      const {question, answer} = this.state;
      const isAnswerValid = !_.isEmpty(answer);
      const isQuestionValid = !_.isEmpty(question);

      if( isAnswerValid && isQuestionValid ){
          this.props.addQuestion({
              answer,
              question,
              id: util.uuid(),
              deckId: this.props.deckId,
          });
          this.setState({
              isQuestionValid : true,
              isAnswerValid : true,
              question: '',
              answer: '',
          });
          this.props.navigation.goBack();
      }else{
          this.setState({
              isAnswerValid,
              isQuestionValid
          });
      }
  }

  /**
  * @description - State object carrying validation booleans
  */
  state = {
      isQuestionValid : true,
      isAnswerValid : true,
      question: '',
      answer: '',
  }

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      const {isQuestionValid, isAnswerValid} = this.state;
      return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={styles.inputBoxWrapper}>
                  <TextInput
                      autoCapitalize={'sentences'}
                      style={styles.inputBox}
                      numberOfLines={6}
                      multiline={true}
                      placeholder={'Question ...'}
                      placeholderTextColor={grey}
                      onChangeText={(question) => this.setState({question})}
                      value={this.state.question}
                  />
                  <Text style={styles.validationText}>{
                      isQuestionValid ? '' : 'Enter valid Question'
                  }</Text>
              </View>

              <View style={styles.inputBoxWrapper}>
                  <TextInput
                      style={styles.inputBox}
                      multiline={true}
                      placeholder={'Answer ...'}
                      placeholderTextColor={lightGrey}
                      onChangeText={(answer) => this.setState({answer})}
                      value={this.state.answer}
                  />

                  <Text style={styles.validationText}>{
                      isAnswerValid ? '' : 'Enter valid Answer'
                  }</Text>
              </View>

              <Text style={styles.validationText}></Text>
          </KeyboardAvoidingView>
      );
  }
}

/**
* @description - Style object
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderColor: coolGrey,
        borderRadius: 3,
        borderWidth: 1
    },
    validationText: {
        color: pink,
    }
});

/**
* @description - Maps action dispatchers to props of this component
* @callBack
* @param {object} dispatch - dispatch from store
* @returns object containing dispatchers
*/
const mapDispatchToProps = dispatch => ({
    addQuestion: (quiz) => dispatch(addQuestion(quiz))
});

/**
* @description - Maps updated state to props of this component
* @callBack
* @param {object} state - state from store
* @param {object} navigation - props pushed from parent component
* @returns deckId from parent
*/
const mapStateToProps = (state, { navigation }) => {
    return {
        deckId : navigation.state.params.deck.id
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuiz);
