import React from 'react';
import { View,
    Text,
    StyleSheet,
    FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getCardList } from '../actions';
import util from '../utils';
import Quiz from './Quiz';
import { clearLocalNotification, setLocalNotification } from '../utils/notif';

/**
* @description - Wrapper for quiz cards
* @component
*/
class TakeQuiz extends React.Component {
  static navigationOptions = ({navigation}) => {
      return {
          title: util.compressText(navigation.state.params.deck.title)
      };
  }

  /**
  * @description - State object carrying counter
  * @description - Counter for howmany quizes are taken
  */
  state = {
      counter : 0
  }

  /**
  * @description - Gets all the cards from AsyncStorage
  * @description - Clears notification setting as viewer sees the quiz
  * @description - Set notification for tomorrow
  * @lifeCycle
  * @returns null
  */
  componentDidMount = () => {
      this.props.getCardList();
      clearLocalNotification();
      setLocalNotification();
  }

  /**
  * @description - CallBack sent to child(ren) quiz card. Quiz card
  * @description - uses this callBack on "CORRECT" & "INCORRECT" button
  * @callBack
  * @returns null
  */
  onButtonPress = () =>
      this.setState((prevState) => {
          return {counter: prevState.counter + 1};
      });

  /**
  * @util
  * @returns HTML template with a FlatList
  */
  renderQuizes = (quizes) =>
      <View style={styles.container}>
          <FlatList
              horizontal={true}
              data={quizes}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) =>
                  <Quiz
                      quiz={item}
                      key={item.id}
                      quizIndex={index + 1}
                      quizLength={quizes.length}
                      onButtonPress={this.onButtonPress}
                  />
              }
          />
      </View>

  /**
  * @util
  * @returns HTML template with a Default message
  */
  renderInfoMessage = () =>
      <View style={styles.container}>
          <Text> All done in this deck </Text>
      </View>

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      let {quizes} = this.props;
      let {counter} = this.state;
      return (counter !== quizes.length) ?
          this.renderQuizes(quizes) :
          this.renderInfoMessage();
  }
}

/**
* @description - Style object
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

/**
* @description - Maps action dispatchers to props of this component
* @callBack
* @param {object} dispatch - dispatch from store
* @returns object containing dispatchers
*/
const mapDispatchToProps = dispatch => ({
    getCardList: () => dispatch(getCardList())
});

/**
* @description - Maps updated state to props of this component
* @callBack
* @param {object} state - state from store
* @param {object} navigation - props pushed from parent component
* @returns object with updated quizes from state & deckId from parent
*/
const mapStateToProps = (state, { navigation }) => {
    let cards = state.cards || [];
    return {
        deckId : navigation.state.params.deck.id,
        quizes : cards.filter(card => card.deckId == navigation.state.params.deck.id)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz);
