import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/colors';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 16,
  },
  textInput: {
    width: width * 0.8,
    height: 32,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: colors.black,
    marginTop: 32,
    padding: 0,
  },
  textInputError: {
    borderColor: colors.redError,
  },
  button: {
    width: width * 0.6,
    height: 50,
    borderRadius: 12,
    marginTop: 32,
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  error: {
    color: colors.redError,
    marginVertical: 8,
    fontSize: 12,
  },
  inputContainer: {
    width: width * 0.8,
    height: 32,
    marginTop: 32,
  },
  iconPositioner: {
    position: 'absolute',
    right: 16,
    top: 0,
  },
  signUpButton: {
    position: 'absolute',
    bottom: getBottomSpace() + height * 0.05,
  },
  signUpText: {
    textAlign: 'center',
  },
});

export default styles;
