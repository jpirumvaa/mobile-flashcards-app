import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../utils/styles';

const SubmitBtn = ({style, onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};


export default SubmitBtn;
