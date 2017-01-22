/**
 * main.js
 * by Danny Sindra
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import ScreenMenu from './ScreenMenu';
import ScreenEnd from './ScreenEnd';
import ScreenGame from './ScreenGame';



export default class Game7048 extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      goal: '',
      gameState: 'MENU'
    };
    StatusBar.setHidden(true);
  }

  getRandomNumber() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        goal = '';
    
    while (goal.length<4) {
      var i = Math.floor(Math.random()*arr.length),
          d = arr[i];
      goal = goal + d;
      arr.splice(i, 1);
    }
    return goal;
  }

  restartGame() {
    this.setState({
      goal: this.getRandomNumber(),
      gameState: 'PLAY'
    });
  }

  endGame() {
    this.setState({
      gameState: 'END'
    }); 
  }

  backToMenu() {
    this.setState({
      gameState: 'MENU'
    }); 
  }

  render() {
    return (
      <Image source={require('../res/bg.png')} style={styles.container}>
        <ScreenMenu 
          gameState={this.state.gameState} 
          onPressPlay={() => this.restartGame()} />
        <ScreenGame
          key={this.state.goal + 'game'} 
          goal={this.state.goal}
          gameState={this.state.gameState}
          onGameEnd={() => this.endGame()} />
        <ScreenEnd 
          gameState={this.state.gameState}
          key={this.state.goal + 'end'}
          goal={this.state.goal}
          onPressPlay={() => this.restartGame()} 
          onPressBack={() => this.backToMenu()} />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    width: null,
    height: null,
  }
});