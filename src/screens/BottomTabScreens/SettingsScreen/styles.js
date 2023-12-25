import { StyleSheet } from 'react-native';

// Packages
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// constants
import theme from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  bodyContainer: {
    padding: '5%',
  },
  text: {
    fontSize: theme.fontSizes.bigFont,
  },

  image: {
    flex: 1,
    opacity: 0.5,
  },
  toggleContainer: {
    bottom: '25%',
    right: '10%',
    position: 'absolute',
  },
  profileConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: wp('25%'),
  },
  profile: {
    width: wp('25%'),
    height: hp('12%'),
    borderRadius: wp('25%'),
  },
  details: {},
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editContainer: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: theme.fontColors.black,
    fontSize: theme.fontSizes.mediumFont,
  },
  saveButton: {
    backgroundColor: theme.backgroundColor.candyBlue,
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  saveButtonText: {
    color: theme.fontColors.black,
    fontSize: theme.fontSizes.mediumFont,
    alignSelf: 'center',
  },
  header: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    paddingLeft: '30%',
  },
});
