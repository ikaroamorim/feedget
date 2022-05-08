import React from 'react';
import { View, Text } from 'react-native';
import { Copyright } from '../Copyright';

import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles';
import { Option } from '../Option';
import { FeedbackType } from '../Widget';

interface Props{
  onFeedBackTypeChanged: ( feedbackType: FeedbackType) => void
}

export function Options( {onFeedBackTypeChanged} : Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Deixe seu Feedback
      </Text>

      <View style={styles.options}>
        {
          Object
            .entries(feedbackTypes)
            .map(([key, value]) => (
              <Option
                key={key}
                title={value.title}
                image={value.image}
                onPress={() => onFeedBackTypeChanged(key as FeedbackType)}
              ></Option>
            ))
        }

      </View>

      <Copyright></Copyright>
    </View>
  );
}