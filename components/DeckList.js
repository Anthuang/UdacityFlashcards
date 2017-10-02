import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import Deck from './Deck';
import { receiveDecks } from '../actions';
import { selectDecks } from '../reducers';

class DeckList extends Component {
  componentWillMount() {
    getDecks().then(decks => {
      this.props.dispatch(receiveDecks(JSON.parse(decks)));
    });
  }
  
  render() {
    const { decks, navigation } = this.props;
    
    return (
      <ScrollView>
        {decks.map((deck, idx) => (
          <TouchableOpacity key={idx} onPress={() => navigation.navigate(
            'DeckDetail',
            {deckName: deck.title}
          )}>
            <Deck deck={deck}/>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks: selectDecks(decks),
  }
}

export default connect(mapStateToProps)(DeckList);
