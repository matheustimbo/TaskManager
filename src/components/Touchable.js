import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

const Touchable = props => {
  console.log('style', props.style?.borderRadius);
  if (Platform.OS === 'android') {
    return (
      <View
        style={{
          borderRadius: props.style?.borderRadius
            ? props.style.borderRadius
            : 0,
          overflow: 'hidden',
        }}>
        <TouchableNativeFeedback onPress={props.onPress}>
          <View style={props.style}>{props.children}</View>
        </TouchableNativeFeedback>
      </View>
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
