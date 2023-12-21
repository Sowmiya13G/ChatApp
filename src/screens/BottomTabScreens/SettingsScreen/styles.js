import {StyleSheet} from 'react-native';

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
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {},
  profileImage: {
    // width: wp('90%'),
    // padding: '10%',
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
});
