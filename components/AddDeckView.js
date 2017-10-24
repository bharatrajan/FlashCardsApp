import React from 'react';
import { View,
    TouchableOpacity,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck, getDeckList } from '../actions';
import util from '../utils';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { white, green, pink, coolGrey} from '../utils/colors';

/**
* @description - Add deck view.
* @component
*/
class AddDeckView extends React.Component {
  /**
  * @description - State object carrying validation booleans
  */
  state = {
      isValid : true,
      isDuplicateTitle : false,
  }

  /**
  * @description - Gets all the Deck from AsyncStorage
  * @lifeCycle
  * @returns null
  */
  componentDidMount = () => {
      this.props.getAllDecksList();
      return null;
  }

  /**
  * @description - Submit button event listener.
  * @description - Contains validation, check for duplicate deck-name.
  * @description - Dispatches addDeck action then navigates to the previous screen
  * @eventListener
  * @returns null
  */
  onPress = () => {
      const {text} = this.state;
      const {decks} = this.props;
      if(!text){
          this.setState({
              isValid : false,
              isDuplicateTitle : false,
          });
          return;
      }else if(!_.isEmpty(decks[text.toLowerCase()])){
          this.setState({
              isValid : true,
              isDuplicateTitle : true
          });
          return;
      }else{
          this.props.addDeck({
              id : util.uuid(),
              timeStamp: new Date().getTime(),
              title: util.capitalizeFirstLetter(text),
          });
          this.setState({
              isValid : true,
              text : '',
              isDuplicateTitle : false,
          });
          this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeckView'}));
          return;
      }
  }

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={styles.inputBoxWrapper}>
                  <Text style={styles.title}> ADD A TITLE </Text>
                  <Text></Text>
                  <Text></Text>
                  <TextInput
                      autoFocus={true}
                      autoCapitalize={'sentences'}
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
          </KeyboardAvoidingView>
      );
  }
}

/**
* @description - Style object
*/
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        height: '100%',
        backgroundColor: white,
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
        borderColor: coolGrey,
        borderRadius: 3,
        borderWidth: 1
    },
    validationText: {
        color: pink,
    },
    SubmitBtn: {
        backgroundColor: green,
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
    addDeck: deck => dispatch(addDeck(deck)),
    getAllDecksList: () => dispatch(getDeckList())
});

/**
* @description - Maps updated state to props of this component
* @callBack
* @param {object} state - state from store
* @returns updated decks
*/
const mapStateToProps = state => {
    let decks = {};
    state.decks.forEach(deck => decks[deck.title.toLowerCase()] = deck);
    return {decks};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckView);
