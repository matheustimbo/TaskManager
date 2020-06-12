import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.skin,
  },
  header: {
    paddingTop: 16 + getStatusBarHeight(),
    padding: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.orange,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-ExtraBold',
    marginTop: 16,
    marginBottom: 16,
  },
  textinput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
    marginTop: 8,
  },
  multilineTextinput: {
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Poppins-SemiBold',
    color: colors.secondaryDarkBlue,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
    paddingBottom: 8,
  },
  dateButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarButton: {
    width: 52,
    height: 52,
    borderRadius: 52,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
  },
  dateTxt: {
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  timesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timesSpacer: {
    width: 48,
  },
  timeButton: {
    width: (width - 32) / 2 - 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
    paddingBottom: 8,
    marginTop: 8,
  },
  timeIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
  },
  createBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blue,
  },
  createBtnTxt: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.redError,
    marginBottom: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
});

export default styles;
