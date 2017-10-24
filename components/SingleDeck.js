import React from 'react';
import { View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { getCardList, deleteQuestion, deleteDeck } from '../actions';
import util from '../utils';
import { Ionicons } from '@expo/vector-icons';
import { white, green, grey, coolGrey } from '../utils/colors';

/**
* @description - Displays a single deck
* @component
*/
class SingleDeck extends React.Component {
  /**
  * @description - Sets right-icon for the current header
  * @callBack
  * @returns object containing right trash icon in header
  */
  static navigationOptions = ({navigation}) => {
      return {
          headerRight: (
              <TouchableOpacity
                  style={{paddingRight:10}}
                  onPress={() => {
                      navigation.setParams({'delete': new Date().getTime()});
                  }}
              >
                  <Ionicons name='ios-trash' size={28} color={white} />
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
          this.deleteDeck();
  }

  /**
  * @description - Calls deleteQuestion action dispatcher for
  * @description - all quizes pertain to the current deckId.
  * @description - Naviagates go previous screen.
  * @description - Calls delete actionDispatcher for deck.
  * @returns null
  */
  deleteDeck = () => {
      const {deck, quizes, deleteDeck, deleteQuestion, navigation} = this.props;
      deleteDeck(deck.id);
      quizes.forEach( quiz => deleteQuestion(quiz.id));
      navigation.goBack();
  }

  /**
  * @description - Gets all the cards from AsyncStorage
  * @lifeCycle
  * @returns null
  */
  componentDidMount = () =>
      this.props.getCardList()

  /**
  * @description - navigates to TakeQuiz screen.
  * @eventListener
  * @returns null
  */
  onStartQuizPress = () =>
      this.props.navigation.navigate('TakeQuiz',{ deck : this.props.deck });

  /**
  * @description - navigates to AddQuiz screen.
  * @eventListener
  * @returns null
  */
  onAddQuizPress = () =>
      this.props.navigation.navigate('AddQuiz',{ deck : this.props.deck });

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      const {deck, quizes} = this.props;
      if(!deck) return null;


      const cardCountText = util.getCardCounts(deck.id, quizes);
      const cardCount = cardCountText.split(' card')[0];

      return (
          <View style={styles.container}>
              <View>
                  <Text style={styles.title}>{deck.title}</Text>
                  <Text ></Text>
                  <Text style={styles.subTitle}>{cardCountText}</Text>
              </View>
              <View>
                  <TouchableOpacity
                      style={styles.SubmitBtn}
                      onPress={this.onAddQuizPress}>
                      <Text style={styles.submitBtnText}>ADD QUIZ</Text>
                  </TouchableOpacity>
                  <Text></Text>
                  {cardCount > 0 &&
          <TouchableOpacity
              style={styles.whiteButton}
              onPress={this.onStartQuizPress}>
              <Text style={styles.whiteButtonText}>START QUIZ</Text>
          </TouchableOpacity>
                  }
              </View>
          </View>
      );
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
        backgroundColor: coolGrey,
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
        fontWeight: '600',
        textAlign: 'center',
    },
    whiteButton:{
        backgroundColor: coolGrey,
        borderWidth: 1,
        borderColor: grey,
        paddingTop: Platform.OS === 'ios' ? 10 : 7,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
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
    SubmitBtn: {
        backgroundColor: green,
        paddingTop: Platform.OS === 'ios' ? 10 : 7,
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
    getCardList: () => dispatch(getCardList()),
    deleteDeck: (deckId) => dispatch(deleteDeck(deckId)),
    deleteQuestion: (cardId) => dispatch(deleteQuestion(cardId)),
});

/**
* @description - Maps updated state to props of this component
* @callBack
* @param {object} state - state from store
* @param {object} navigation - props pushed from parent component
* @returns object with updated quizes from state & deck from parent
*/
const mapStateToProps = (state, { navigation }) => {
    return {
        quizes : state.cards,
        deck : navigation.state.params.deck,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleDeck);
