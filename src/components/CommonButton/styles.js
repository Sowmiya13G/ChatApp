import {StyleSheet} from 'react-native';
import { color, fontSizes } from '../../constants/theme';
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
    backgroundColor: color.secondaryBlack,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    borderRadius: 20,
    borderColor: color.secondaryBlack,
    borderWidth: 2,
    marginBottom: '5%',
  },
  logInButtonText: {
    color: color.white,
  },
  optionButtonText: {
    color: color.secondaryBlack,
  },
});
