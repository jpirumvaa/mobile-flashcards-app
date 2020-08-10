import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {styles} from '../utils/styles';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';
import SubmitBtn from './SubmitBtn';

class ScoreCard extends Component {
  componentDidMount () {
    clearLocalNotification ().then (setLocalNotification);
  }

  render () {
    const {score, maxScore, resetScore, deckTitle, navigation} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckTitle}>
            SCORE:
          </Text>
          <Text style={styles.deckTitle}>
            {(score / maxScore * 100).toFixed (2)} %
          </Text>
        </View>
        <View style={{justifycontent: 'flex-end'}}>
          <SubmitBtn
            style={styles.restartQuizButton}
            onPress={() => {
              resetScore ();
              navigation.navigate ('Quiz', {deckTitle: deckTitle});
            }}
            text="Restart Quiz"
          />
          <SubmitBtn
            style={styles.backToDeckButton}
            onPress={() => {
              resetScore ();
              navigation.navigate ('Deck', {deckTitle: deckTitle});
            }}
            text="Back to Deck"
          />
        </View>
      </View>
    );
  }
}



export default connect () (ScoreCard);
