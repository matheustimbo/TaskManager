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
    paddingTop: 32 + getStatusBarHeight(),
    padding: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.orange,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  hello: {
    color: colors.darkBlue,
    fontSize: 20,
  },
  userName: {
    color: colors.darkBlue,
    fontFamily: 'Poppins-Bold',
  },
  pageScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tasksTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  addTaskBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    backgroundColor: colors.green,
  },
  add: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkerSkin,
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  imageReplacement: {
    backgroundColor: colors.blue,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageReplacementTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.white,
  },
  taskBody: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',

    maxWidth: width - 32 - 40 - 32 - 8 - 48,
  },
  taskDate: {
    fontSize: 16,
  },
});

export default styles;
