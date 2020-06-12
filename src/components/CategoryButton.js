import React from 'react';
import {View, Text} from 'react-native';
import Touchable from './Touchable';
import colors from '../utils/colors';

const CategoryButton = props => {
  return (
    <Touchable
      onPress={props.onPress}
      style={{
        paddingVertical: 4,
        marginRight: 8,
        marginVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 24,
        alignSelf: 'flex-start',
        backgroundColor: props.selected ? colors.red : colors.grey,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: props.selected ? colors.white : colors.darkBlue,
        }}>
        {props.category}
      </Text>
    </Touchable>
  );
};

export default CategoryButton;
