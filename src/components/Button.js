import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

const Button = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        <View
          style={[
            {justifyContent: 'center', alignItems: 'center'},
            props.style,
          ]}>
          {props.loading ? (
            <ActivityIndicator
              size="large"
              color={props.loadingColor ? props.loadingColor : 'white'}
            />
          ) : (
            <Text style={props.textStyle}>{props.text}</Text>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[{justifyContent: 'center', alignItems: 'center'}, props.style]}>
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color={props.loadingColor ? props.loadingColor : 'white'}
          />
        ) : (
          <Text style={props.textStyle}>{props.text}</Text>
        )}
      </TouchableOpacity>
    );
  }
};

export default Button;
