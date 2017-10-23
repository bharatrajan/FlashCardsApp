import React, { Component } from 'react'
import { View,
         Text,
         StyleSheet,
         FlatList,
         TextInput } from 'react-native'
import { connect } from 'react-redux'
import { getCardList } from '../actions';
import { FontAwesome } from '@expo/vector-icons'
import util from '../utils'
import _ from 'lodash';
import Quiz from './Quiz';
import { NavigationActions, TabNavigator } from 'react-navigation'
import { white, green, pink, grey, lightGrey, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notif'


function redView (){
  return(
    <View style={{backgroundColor: red, flex: 1}}></View>
  )
}

function pinkView (){
  return(
    <View style={{backgroundColor: pink, flex: 1}}></View>
  )
}

class TakeQuiz extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: util.compressText(navigation.state.params.deck.title)
    }
  }

  state = {
    counter : 0
  }

  componentDidMount = () => {
    this.props.getCardList()
    clearLocalNotification()
    setLocalNotification()
  }

  onButtonPress = () => {
    this.setState((prevState) => {
      return {counter: prevState.counter + 1};
    });
  }

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

  renderInfoMessage = () =>
      <View style={styles.container}>
        <Text> All done in this deck </Text>
      </View>

  render() {
    let {quizes} = this.props;
    let {counter} = this.state;
    return (counter !== quizes.length) ?
           this.renderQuizes(quizes) :
           this.renderInfoMessage()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapDispatchToProps = dispatch => ({
  getCardList: () => dispatch(getCardList())
});

const mapStateToProps = (state, { navigation }) => {
  let cards = state.cards || [];
  return {
    deckId : navigation.state.params.deck.id,
    quizes : cards.filter(card => card.deckId == navigation.state.params.deck.id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz)
