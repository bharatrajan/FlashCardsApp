import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getDeckList, recieveDeckList } from '../actions';

class DeckListView extends React.Component {

  componentDidMount = () => {
    this.props.getAllDecksList()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> DeckListView </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  getAllDecksList: () => dispatch(getDeckList())
});

const mapStateToProps = state => {
  console.log("state : ", state);
  return state
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
