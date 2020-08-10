import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {saveCardToDeck} from '../utils/api';
import {addCard} from '../actions';
import {styles} from '../utils/styles';
import SubmitBtn from './SubmitBtn';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  };

  toDeck = () => {
    this.props.navigation.goBack ();
  };

  onChangeQuestion (text) {
    this.setState ({
      question: text,
    });
  }

  onChangeAnswer (text) {
    this.setState ({
      answer: text,
    });
  }

  submit = () => {
    const {question, answer} = this.state;
    if (question === '') {
      alert ('Please enter question');
    } else if (answer === '') {
      alert ('Please enter answer');
    } else {
      const {deckTitle} = this.props;
      const card = {
        question: question,
        answer: answer,
      };
      this.props.dispatch (addCard(deckTitle, card));
      saveCardToDeck(deckTitle, card);
      this.setState ({
        question: '',
        answer: '',
      });
      this.toDeck ();
    }
  };

  render () {
    return (
      <View style={styles.addContainer}>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={text => this.onChangeQuestion (text)}
            placeholder="Question"
            value={this.state.question}
            multiline
            numberOfLines={4}
            maxLength={40}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={text => this.onChangeAnswer (text)}
            placeholder="Answer"
            value={this.state.answer}
            multiline
            numberOfLines={4}
            maxLength={40}
          />
        </View>
        <SubmitBtn
          style={styles.submitButton}
          onPress={this.submit}
          text="Submit"
        />
      </View>
    );
  }
}



function mapStateToProps (state, {route}) {
  const {deckTitle} = route.params;
  return {
    deckTitle,
  };
}

export default connect (mapStateToProps) (NewQuestion);
