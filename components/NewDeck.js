import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { buttonStyles, inputStyles } from '../styles';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

class NewDeck extends Component {
  state = {
    text: '',
    error: '',
  }

  submit() {
    let newDeck = this.state.text;

    if (newDeck === '') {
      this.setState({error: 'Please enter a name.'});
      return;
    }
    
    if (this.props.decks[newDeck]) {
      this.setState({error: 'Deck already exists.'});
      return;
    }
    
    this.props.dispatch(addDeck(newDeck));
    
    this.setState({
      text: '',
      error: '',
    });

    saveDeckTitle(newDeck).then(() => {
      this.props.navigation.navigate(
        'DeckDetail',
        {deckName: newDeck}
      );
    });
  }
  
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.promptText}>What is title of your new deck?</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextInput
            style={[Platform.OS === 'ios' ? inputStyles.iosInput : inputStyles.AndroidInput, {marginBottom: 5}]}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#000'}]}
            onPress={() => this.submit()}
          >
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
          <Text style={{color: '#f00'}}>
            {this.state.error && this.state.error}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  promptText: {
    fontSize: 45,
    textAlign: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(NewDeck);
