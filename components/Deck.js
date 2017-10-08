import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Deck = ({deck}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 15,
  },
});

export default Deck;
