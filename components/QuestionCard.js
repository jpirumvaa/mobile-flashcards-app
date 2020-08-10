import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/styles';
import SubmitBtn from './SubmitBtn';
import TextButton from './TextButton';

const ToggleQuestionAnswer = props => {
  let content, buttonText;
  const {question, renderQuestion, toggle} = props;
  if (renderQuestion) {
    content = question.question;
    buttonText = 'Show Answer';
  } else {
    content = question.answer;
    buttonText = 'Show Question';
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.deckTitle}>
          {content}
        </Text>
      </View>
      <TextButton style={{padding: 10}} onPress={toggle}>
        {buttonText}
      </TextButton>
    </View>
  );
};

class QuestionCard extends Component {
  state = {
    renderQuestion: true,
  };

  toggleRenderQuestion () {
    this.setState (currState => ({
      renderQuestion: !currState.renderQuestion,
    }));
  }

  render () {
    const {style, question, onCorrectAnswer, onIncorrectAnswer} = this.props;
    const {renderQuestion} = this.state;
    return (
      <View style={style}>
        <ToggleQuestionAnswer
          question={question}
          renderQuestion={renderQuestion}
          toggle={() => this.toggleRenderQuestion ()}
        />
        {!renderQuestion &&
          <View>
            <SubmitBtn
              style={styles.correctButton}
              onPress={() => {
                this.toggleRenderQuestion ();
                onCorrectAnswer ();
              }}
              text="Correct"
            />
            <SubmitBtn
              style={styles.redButton}
              onPress={() => {
                this.toggleRenderQuestion ();
                onIncorrectAnswer ();
              }}
              text="Incorrect"
            />
          </View>}
      </View>
    );
  }
}


export default QuestionCard;
