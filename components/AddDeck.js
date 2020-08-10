import React, {Component} from 'react';
import {View, Text,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {saveDeckTitle} from '../utils/api';
import {styles} from '../utils/styles';
import {addDeck} from '../actions';
import SubmitBtn from './SubmitBtn';

class AddDeck extends Component {
  state = {
    deckTitle: '',
  };

  toDeck = deckTitle => {
    this.props.navigation.navigate ('Deck', {deckTitle: deckTitle});
  };

  onChangeText (text) {
    this.setState ({
      deckTitle: text,
    });
  }

  submit = () => {
    const {deckTitle} = this.state;
    if (deckTitle === '') {
      alert ('Please enter deck title');
    } else {
      const deck = {
        title: deckTitle,
        questions: [],
      };
      this.props.dispatch (addDeck (deck));
      saveDeckTitle (deckTitle);
      this.setState ({
        deckTitle: '',
      });
      this.toDeck (deckTitle);
    }
  };

  render () {
    return (
      <View style={styles.addContainer}>
        <View>
          <Text style={styles.deckTitle}>
            Deck Title
          </Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={text => this.onChangeText (text)}
            placeholder="Enter deck title"
            value={this.state.deckTitle}
          />
        </View>
        <SubmitBtn
          style={styles.addButton}
          onPress={this.submit}
          text="Add Deck"
        />
      </View>
    );
  }
}
export default connect () (AddDeck);
