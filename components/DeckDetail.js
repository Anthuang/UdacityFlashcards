import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { buttonStyles } from '../styles';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckName
    }
  }

  render() {
    const { deck } = this.props;
    
    if (!deck) {
      return (
        <Text>Finding the deck...</Text>
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#fff'}]}
            onPress={() => this.props.navigation.navigate('NewCard', {deckName: deck.title})}
          >
            <Text style={{color: '#000'}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#000'}]}
            onPress={() => this.props.navigation.navigate('Quiz', {deckName: deck.title})}
          >
            <Text style={{color: '#fff'}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textWrap: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
  },
  subtitle: {
    fontSize: 25,
  },
  buttonWrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(decks, ownProps) {
  return {
    deck: decks[ownProps.navigation.state.params.deckName],
  };
}

export default connect(mapStateToProps)(DeckDetail);
