import React, {Component} from 'react';
import { View} from 'react-native';
import {connect} from 'react-redux';
import {deleteDeck} from '../actions';
import {deleteDeckFromStorage} from '../utils/api';
import {styles} from '../utils/styles';
import {red} from '../utils/colors';
import SubmitBtn from './SubmitBtn';
import TextButton from './TextButton';
import DeckDetails from './DeckDetails';

class Deck extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== null;
  }

  toHome = () => {
    this.props.navigation.navigate ('Deck List', {screen: 'DeckList'});
  };

  handleRemoveDeck = () => {
    const {goBack, deck} = this.props;
    this.props.dispatch (deleteDeck (deck.title));
    deleteDeckFromStorage (deck.title);
    this.toHome ();
  };

  render () {
    const {title, questions} = this.props.deck;
    return (
      <View style={styles.container}>
        <DeckDetails style={styles.deckDetails} deck={this.props.deck} />
        <SubmitBtn
          style={styles.addCardButton}
          onPress={() =>
            this.props.navigation.navigate ('New Question', {deckTitle: title})}
          text="Add Card"
        />
        <SubmitBtn
          style={styles.startQuizButton}
          onPress={() =>
            this.props.navigation.navigate ('Quiz', {deckTitle: title})}
          text="Start Quiz"
        />
        <TextButton style={{padding: 10, backgroundColor: red}} onPress={this.handleRemoveDeck}>
          Delete Deck
        </TextButton>
      </View>
    );
  }
}

function mapStateToProps (state, {route}) {
  const {deckTitle} = route.params;
  return {
    deck: deckTitle in state ? state[deckTitle] : null,
  };
}

export default connect (mapStateToProps) (Deck);
