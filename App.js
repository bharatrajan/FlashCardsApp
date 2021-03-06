import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AddDeckView from './components/AddDeckView.js';
import DeckListView from './components/DeckListView.js';
import SingleDeck from './components/SingleDeck.js';
import TakeQuiz from './components/TakeQuiz.js';
import AddQuiz from './components/AddQuiz.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { white, green } from './utils/colors';
import { setLocalNotification } from './utils/notif';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

/**
* @description - Creates global store object
*/
const store = createStore(reducer, applyMiddleware(thunk));

/**
* @description - Status bar component wrapper with styles
* @component
*/
function LocalStatusBar () {
    return (
        <View style={{ backgroundColor:green, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={green} barStyle={'light-content'} />
        </View>
    );
}

/**
* @description - Tab navigation object
* @description - Contains "deckListView" & "AddDeckView"
*/
const Tabs = TabNavigator({
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            tabBarLabel: 'Deck List',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },
    AddDeckView: {
        screen: AddDeckView,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? green : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : green,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

/**
* @description - Main navigation object: StackNavigator
* @description - Contains "TabNavigator", "SingleDeck", "AddQuiz" & "TakeQuiz"
*/
const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    SingleDeck: {
        screen: SingleDeck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green,
            }
        }
    },
    AddQuiz: {
        screen: AddQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green,
            }
        }
    },
    TakeQuiz:{
        screen: TakeQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green,
            }
        }
    }
});


export default class App extends React.Component {
  /**
  * @description - Ask & set local Notifications
  * @lifeCycle
  * @returns null
  */
  componentDidMount = () =>
      setLocalNotification('App.js')

  /**
  * @description - Renderer for this component
  * @description - Carries HTML
  * @lifeCycle
  * @returns html template
  */
  render() {
      return (
          <Provider store={store}>
              <View style={styles.container} >
                  <LocalStatusBar backgroundColor={green} barStyle="light-content"></LocalStatusBar>
                  <MainNavigator/>
              </View>
          </Provider>
      );
  }
}

/**
* @description - Style object
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
