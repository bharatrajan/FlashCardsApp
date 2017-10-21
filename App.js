import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import AddDeckView from './components/AddDeckView.js'
import DeckListView from './components/DeckListView.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { purple, white, green } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

const store = createStore(reducer, applyMiddleware(thunk));

function LocalStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={green} {...props} />
    </View>
  )
}

const HomeTabs = TabNavigator({
  DeckListView: {screen: DeckListView},
  AddDeckView: {screen: AddDeckView}
})


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container} >
            <LocalStatusBar backgroundColor={green} barStyle="light-content" />
            <DeckListView/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
