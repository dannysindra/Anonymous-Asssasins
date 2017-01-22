/**
 * ScreenMenu.js
 * by Danny Sindra
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';


export default class ScreenMenu extends React.Component {
  render() {
    var gameState = this.props.gameState;
    if (gameState != 'MENU') {
      return <View/>;
    }

    return (
      <View style={styles.overlay}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}></Text>
        </View>
        <View style={styles.containerButtonPlay}>
          <TouchableHighlight onPress={this.props.onPressPlay} style={styles.buttonPlay}>
            <Text style={styles.buttonTextPlay}>PLAY</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerTitle: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  containerButtonPlay : {
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'center',
  },
  buttonPlay: {
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.75,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    height: 60,
    justifyContent: 'center',
    marginBottom: 20,
    width: 220,
  },
  buttonTextPlay: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});