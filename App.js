import React from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import Constants from 'expo-constants';
import reducer from './reducers';
import {darkBlue, white} from './utils/colors';
import {setLocalNotification} from './utils/helpers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

function getHeaderTitle (route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'DeckList';
  switch (routeName) {
    case 'Deck List':
      return 'Deck List';
    case 'Add Deck':
      return 'Add Deck';
  }
}

const FlashcardStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tab = createBottomTabNavigator ();
const Stack = createStackNavigator ();

const NavTab = ({navigation, route}) => {
  React.useLayoutEffect (
    () => {
      navigation.setOptions ({headerTitle: getHeaderTitle (route)});
    },
    [navigation, route]
  );
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: darkBlue,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tab.Screen
        name="Deck List"
        component={DeckList}
        options={{
          tabBarLabel: 'Deck List',
          tabBarIcon: ({tintColor}) => (
            <AntDesign name="book" size={30} color={tintColor}/>
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({tintColor}) => (
            <Ionicons name="ios-add-circle" size={30} color={tintColor}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Deck List"
      component={NavTab}
      options={({route}) => ({
        headerTitle: getHeaderTitle (route),
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkBlue,
        },
      })}
    />
    <Stack.Screen
      name="Deck"
      component={Deck}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkBlue,
        },
      }}
    />
    <Stack.Screen
      name="New Question"
      component={NewQuestion}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkBlue,
        },
      }}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkBlue,
        },
      }}
    />
  </Stack.Navigator>
);

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification ();
  }
  render () {
    return (
      <Provider store={createStore (reducer)}>
        <View style={{flex: 1}}>
          <FlashcardStatusBar
            backgroundColor={darkBlue}
            barStyle="light-content"
          />
          <NavigationContainer>
            <NavStack />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
