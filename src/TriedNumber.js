/**
 * TriedNumber.js
 * by Danny Sindra
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class TriedNumber extends React.Component {
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


const styles = StyleSheet.create({
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
  }
});