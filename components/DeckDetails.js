import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/styles';

const DeckDetails = ({style, deck}) => {
  return (
    <View style={style}>
      <View>
        <Text style={styles.deckTitle}>
          {deck.title}
        </Text>
      </View>
      <View>
        <Text style={styles.cardsNumber}>
          {deck.questions.length} {deck.questions.length<1?"Card":"Cards"}
        </Text>
      </View>
    </View>
  );
};


export default DeckDetails;
