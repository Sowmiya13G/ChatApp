import {StyleSheet} from 'react-native';
import theme from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  logInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: '10%',
    backgroundColor: theme.backgroundColor.secondaryBlack,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    borderRadius: 20,
    borderColor: theme.backgroundColor.secondaryBlack,
    borderWidth: 2,
    marginBottom: '5%',
  },
  logInButtonText: {
    color: theme.fontColors.white,
  },
  optionButtonText: {
    color: theme.fontColors.secondaryBlack,
  },
});
