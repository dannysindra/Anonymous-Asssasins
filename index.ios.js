/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Image,
  Picker,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
var Sound = require('react-native-sound');


class ScreenMenu extends React.Component {
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

class ScreenEnd extends React.Component {
  render() {
    var gameState = this.props.gameState;
    if (gameState != 'END') {
      return <View/>;
    }

    return (
      <View style={styles.overlayEnd}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{this.props.goal}</Text>
          <Text style={styles.subtitle}>ACCESS GRANTED</Text>
        </View>
        <View style={styles.containerButtonPlay}>
          <TouchableHighlight 
            onPress={this.props.onPressPlay} 
            style={styles.buttonPlay}>
            <Text style={styles.buttonTextPlay}>PLAY AGAIN</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={this.props.onPressBack} 
            style={styles.buttonBack}>
            <Text style={styles.buttonTextBack}>BACK TO MENU</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class ScreenGame extends React.Component {
  constructor(props = {}) {
    super(props);
    
    this.state = {
      target: this.props.goal,
      tried: [],
      val1: 0,
      val2: 0,
      val3: 0,
      val4: 0,
      fadeAnim: new Animated.Value(0),
    };
  }

  checkNumber() {
    var check = '' + this.state.val1 + this.state.val2 + this.state.val3 + this.state.val4;
    if (check === this.state.target) {
      this.props.onGameEnd();
      this.playSound('Action_Enter');
    }
    else {
      this.setState({
        tried: [check].concat(this.state.tried)
      });
      this.playSound('Selection_Deny');
    };

    if (this.state.tried.length === 0) {
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 0.85, timing: 1500}
      ).start();
    }
  }

  playSound(sound) {
    var s = new Sound('' +sound+ '.mp3', Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        console.log('duration', s.getDuration());
        s.play();
      }
    });
  }

  generatePickerItem(val) {
    return <Picker.Item key={val} label={val} value={val} />
  }

  render() {
    var gameState = this.props.gameState;
    if (gameState != 'PLAY') {
      return <View/>;
    }

    var arrDigits = ['0','1','2','3','4','5','6','7','8','9'],
        styleContainerInfo = {
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          backgroundColor: '#8B8386',
          borderBottomWidth: 2,
          borderBottomColor: '#BABABA',
          flex: 0.12,
          justifyContent: 'center',
          paddingTop: 10,
          paddingLeft: 10,
          opacity: this.state.fadeAnim
        };

    return (
      <View style={styles.overlay}>
        <Animated.View style={styleContainerInfo}>
          <Text style={styles.gameInfoTextRed}>
            <Text style={{backgroundColor:'red'}}>{'    '}</Text> : INVALID DIGIT
          </Text>
          <Text style={styles.gameInfoText}>
            <Text style={{backgroundColor:'orange'}}>{'    '}</Text> : INVALID PLACEMENT
          </Text>
        </Animated.View>
        <View style={styles.containerGameTried}>
          <InvertibleScrollView inverted
            ref='_scrollView'
            bounces={false} 
            onContentSizeChange={(contentWidth, contentHeight)=>{
              this.refs._scrollView.scrollTo({y:0, animated: true});
            }}
            style={styles.containerTriedScrollView}>
            {this.state.tried.map(
              (val,idx)=> <TriedNumber key={idx} target={this.state.target} number={val}/>
            )}
            {this.state.tried.length>0 ?
              <View style={styles.triedNumberContainer}>
                <Text style={styles.gameInfoText}>PREVIOUS ATTEMPTS</Text>
              </View> :
              <View/>
            }
          </InvertibleScrollView>
        </View>
        <View style={styles.containerGameInput}>
          <View style={styles.containerPickers}>
            <Picker 
              selectedValue={this.state.val1}
              onValueChange={(val) => this.setState({val1: val})}
              style={styles.picker}
              itemStyle={styles.pickerText}>
              {arrDigits.map((d) => this.generatePickerItem(d))}
            </Picker>
            <Picker 
              selectedValue={this.state.val2}
              onValueChange={(val) => this.setState({val2: val})}
              style={styles.picker}
              itemStyle={styles.pickerText}>
              {arrDigits.map((d) => this.generatePickerItem(d))}
            </Picker>
            <Picker 
              selectedValue={this.state.val3}
              onValueChange={(val) => this.setState({val3: val})}
              style={styles.picker}
              itemStyle={styles.pickerText}>
              {arrDigits.map((d) => this.generatePickerItem(d))}
            </Picker>
            <Picker 
              selectedValue={this.state.val4}
              onValueChange={(val) => this.setState({val4: val})}
              style={styles.picker}
              itemStyle={styles.pickerText}>
              {arrDigits.map((d) => this.generatePickerItem(d))}
            </Picker>
          </View>
          <View style={styles.containerButtonPlay}>
            <TouchableHighlight onPress={() => this.checkNumber()} style={styles.buttonPlay}>
              <Text style={styles.buttonTextPlay}>CHECK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

class TriedNumber extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  generateColoredText(d, idx) {
    var arrnum = [...this.props.target],
        styleDefault = {fontSize: 24, fontWeight: 'bold', borderWidth: 1,},
        styleText = {}; 

    if (arrnum[idx]===d)
      styleText = Object.assign({}, styleDefault, {backgroundColor: '#00C957', color: 'white'});
    else if (arrnum.indexOf(d)>-1)
      styleText = Object.assign({}, styleDefault, {backgroundColor: 'orange'});
    else 
      styleText = Object.assign({}, styleDefault, {backgroundColor: 'red'});

    return <Text key={idx} style={styleText}>{'   ' +d+ '  '}</Text>; 
  }

  render() {
    return (
      <View key={this.props.number} style={styles.triedNumberContainer}>
        {[...this.props.number].map((el, i) => this.generateColoredText(el, i))}
      </View>
    );
  }
}

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
      <Image source={require('./img/bg-cia.jpg')} style={styles.container}>
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
  },
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
  subtitle: {
    fontSize: 24,
    color: 'white',
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
  buttonBack: {
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.75,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'orange',
    height: 60,
    justifyContent: 'center',
    width: 220,
  },
  buttonTextPlay: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextBack: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerGameInfo: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: '#838B8B',
    opacity: 0.85,
    flex: 0.12,
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
  },
  gameInfoTextRed: {
    color:'white', 
    fontSize: 18,
    marginBottom: 7,
  },
  gameInfoText: {
    color:'white', 
    fontSize: 18,
  },
  containerGameTried: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 0.38,
    justifyContent: 'center',
  },
  containerTriedScrollView: {
    alignSelf: 'stretch',
  },
  triedNumberContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.85,
    borderBottomWidth: 1,
    borderBottomColor: '#BABABA', 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  containerGameInput: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'black',
    opacity: 0.85,
    borderTopWidth: 2,
    borderTopColor: '#BABABA', 
    flex: 0.5,
    justifyContent: 'center',
  },
  containerPickers: {
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',
  },
  picker: {
    marginLeft: 5,
    marginRight: 5,
    width: 50,
  },
  pickerText: {
    fontSize: 32,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  },
  overlayEnd: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.85,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('Game7048', () => Game7048);
