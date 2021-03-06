import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Animated} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../utils/api';
import {styles} from '../utils/styles';
import {receiveDecks} from '../actions';
import {AppLoading} from 'expo';
import DeckDetails from './DeckDetails';

class DeckList extends Component {
  state = {
    ready: false,
    bounceValue: new Animated.Value (1),
  };

  componentDidMount () {
    const {dispatch} = this.props;

    getDecks ()
      .then (decks => {
        dispatch (receiveDecks (decks));
      })
      .then (() => this.setState (() => ({ready: true})));
  }

  handleOnPress (value) {
    const {bounceValue} = this.state;
    Animated.sequence ([
      Animated.timing (bounceValue, {
        duration: 200,
        toValue: 1.04,
        useNativeDriver: true,
      }),
      Animated.spring (bounceValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start ();
    this.props.navigation.navigate ('Deck', {deckTitle: value.title});
  }

  renderItem = ({item}) => {
    const [key, value] = item;
    const {bounceValue} = this.state;

    return (
      <Animated.View
        key={key}
        style={[styles.container, {transform: [{scale: bounceValue}]}]}
      >
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.handleOnPress (value)}
        >
          <DeckDetails style={styles.deckDetails} deck={value} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render () {
    const {decks} = this.props;
    const {ready} = this.state;
    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <FlatList
        data={Object.entries (decks)}
        renderItem={this.renderItem}
        keyExtractor={item => {
          const [key, value] = item;
          return key;
        }}
      />
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks,
  };
}

export default connect (mapStateToProps) (DeckList);
