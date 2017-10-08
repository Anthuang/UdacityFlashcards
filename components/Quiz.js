import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { buttonStyles } from '../styles';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    progress: 0,
    score: 0,
    showAnswer: false,
    showScore: false,
  }

  advance(inc) {
    let { progress, score } = this.state;
    const { questions } = this.props.deck;

    progress++;
    score += inc;
    if (progress === questions.length) {
      this.setState({
        showScore: true,
        score,
      });
      clearLocalNotification()
        .then(setLocalNotification);
      return;
    }


    this.setState({
      showAnswer: false,
      score,
      progress,
    });
  }

  reset() {
    this.setState({
      progress: 0,
      score: 0,
      showAnswer: false,
      showScore: false,
    });
  }

  render() {
    const { progress, score, showAnswer, showScore } = this.state;
    const { navigation } = this.props;
    const { questions } = this.props.deck;

    if (questions.length === 0) {
      return (
        <Text>Please add some cards first!</Text>
      )
    }

    if (showScore) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>Your final score is {score}!</Text>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#fff'}]}
            onPress={() => this.reset()}
          >
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#000'}]}
            onPress={() => navigation.navigate(
              'DeckDetail',
              {deckName: navigation.state.params.deckName}
            )}
          >
          <Text style={{color: '#fff'}}>Back to Deck</Text>
        </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={styles.stats}>{progress + 1}/{questions.length}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.stats}>Score: {score}</Text>
          </View>
        </View>
        <View style={styles.quizBody}>
          <Text style={styles.question}>
            {showAnswer ? (
              questions[progress].answer
            ) : (
              questions[progress].question
            )}
          </Text>
          <TouchableOpacity onPress={() => this.setState({showAnswer: true})}>
            <Text>View answer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#98fb98'}]}
            onPress={() => this.advance(1)}
          >
            <Text style={{color: '#fff'}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? buttonStyles.iosBtn : buttonStyles.AndroidBtn, {backgroundColor: '#ff6347'}]}
            onPress={() => this.advance(0)}
          >
            <Text style={{color: '#fff'}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stats: {
    fontSize: 15,
    margin: 5,
  },
  question: {
    fontSize: 35,
    marginBottom: 5,
    textAlign: 'center',
  },
  quizBody: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 2,
    alignItems: 'center',
  },
});

function mapStateToProps(decks, ownProps) {
  return {
    deck: decks[ownProps.navigation.state.params.deckName],
  };
}

export default connect(mapStateToProps)(Quiz);
