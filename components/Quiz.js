import React from 'react';
import { View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { deleteQuestion, incrementScore } from '../actions';
import { white, green, pink, red } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

/**
* @description - Screen Dimensions for styling
*/
const screenDimensions = Dimensions.get('window');

/**
* @description - A single QUIZ card component
* @component
*/
class Quiz extends React.Component {
  /**
  * @description - State object carrying validation booleans
  */
  state = {
      flip : true,
      hideClass : {}
  }

  /**
  * @description - OnPress event listener.
  * @description - Flips the card and shows answer from question( & Vise versa)
  * @eventListener
  * @returns null
  */
  flipCard = () =>
      this.setState((prevState) => {
          return {flip: !prevState.flip};
      });

  /**
  * @description - OnPress event listener for the "CORRECT" button.
  * @description - Removes this current card from screen.
  * @description - Calls callBack from parent.
  * @description - calls incrementScore action dispatcher.
  * @eventListener
  * @returns null
  */
  onCorrectPress = () => {
      const {onButtonPress, incrementScore, deckId} = this.props;
      onButtonPress();
      this.setState({
          hideClass : {display : 'none'}
      });
      incrementScore(deckId);
  }

  /**
  * @description - OnPress event listener for the "INCORRECT" button.
  * @description - Removes this current card from screen.
  * @description - Calls callBack from parent.
  * @eventListener
  * @returns null
  */
  onIncorrectPress = () => {
      this.props.onButtonPress();
      this.setState({
          hideClass : {display : 'none'}
      });
  }

  /**
  * @description - OnPress event listener for trash icon.
  * @description - Calls deleteQuestion actionDispatcher.
  * @eventListener
  * @returns null
  */
  delete = () =>
      this.props.deleteQuestion(this.props.quiz.id)

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      const {flip, hideClass} = this.state;
      const {quizIndex, quizLength} = this.props;
      const {answer, question} = this.props.quiz;
      return (
          <View style={[styles.container, hideClass]}>
              <View style={styles.header}>
                  <Text style={[styles.headerElements, {paddingTop: 5}]}>
                      { `${quizIndex} of ${quizLength}` }
                  </Text>
                  <TouchableOpacity onPress={this.delete} style={styles.headerElements}>
                      <Ionicons name='ios-trash' size={28} color={red} />
                  </TouchableOpacity>
              </View>

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

/**
* @description - Style object
*/
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
        justifyContent: 'space-between',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    header:{
        maxHeight: 33,
        width: screenDimensions.width - 50,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    headerElements:{
        height: 30
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
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
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

/**
* @description - Maps action dispatchers to props of this component
* @callBack
* @param {object} dispatch - dispatch from store
* @returns object containing dispatchers
*/
const mapDispatchToProps = dispatch => ({
    incrementScore: (deckId) => dispatch(incrementScore(deckId)),
    deleteQuestion: (quizId) => dispatch(deleteQuestion(quizId))
});

export default connect(null, mapDispatchToProps)(Quiz);
