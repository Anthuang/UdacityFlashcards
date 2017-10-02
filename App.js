import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers';
import { setLocalNotification } from './utils/notifications';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';

function FlashcardsStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={30} color={tintColor}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  NewCard: {
    screen: NewCard,
    title: 'New card',
  },
  Quiz: {
    screen: Quiz,
    title: 'Quiz',
  }
})

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor='#000' barStyle="light-content"/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
