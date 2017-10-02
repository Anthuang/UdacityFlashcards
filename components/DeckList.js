import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
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
      <FlatList
        data={decks}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate(
            'DeckDetail',
            {deckName: item.title}
          )}>
            <Deck deck={item}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks: selectDecks(decks),
  }
}

export default connect(mapStateToProps)(DeckList);
