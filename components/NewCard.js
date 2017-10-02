import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { buttonStyles, inputStyles } from '../styles';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    error: '',
  }

  submit() {
    const { answer, question } = this.state;
    const { deckName } = this.props.navigation.state.params;

    if (answer === '' || question === '') {
      this.setState({error: 'Please enter all fields.'});
      return;
    }

    this.props.dispatch(addCard(
      deckName,
      {
        question,
        answer,
      },
    ));

    addCardToDeck(deckName, {
      question: this.state.question,
      answer: this.state.answer,
    });
    
    this.setState({
      question: '',
      answer: '',
      error: '',
    });
    
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 9, alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={styles.text}>Question</Text>
          <TextInput
            style={Platform.OS === 'ios' ? inputStyles.iosInput : inputStyles.AndroidInput}
            onChangeText={question => this.setState({question})}
            value={this.state.question}
          />
          <Text style={styles.text}>Answer</Text>
          <TextInput
            style={Platform.OS === 'ios' ? inputStyles.iosInput : inputStyles.AndroidInput}
            onChangeText={answer => this.setState({answer})}
            value={this.state.answer}
          />
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#000'}]}
            onPress={() => this.submit()}
          >
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={{color: '#f00', textAlign: 'center'}}>
            {this.state.error && this.state.error}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },
});

export default connect()(NewCard);
