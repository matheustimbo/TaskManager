import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

const Touchable = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={props.style}>{props.children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        {props.children}
      </TouchableOpacity>
    );
  }
};

export default Touchable;
