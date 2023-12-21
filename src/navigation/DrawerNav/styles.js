import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: hp('90%'),
    // width: wp('60%'),
  },
  cancel: {
    right: '5%',
    top: '5%',
    position: 'absolute',
  },
  userName: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
  },
  text: {
    color: theme.fontColors.secondaryBlack,
    opacity: 0.5,
    fontSize: theme.fontSizes.mediumFontText,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    // width: theme.screenWidth,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    bottom: 0,
  },
  nightMode: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '10%',
    left: '6%',
  },
  nightModeText: {
    fontSize: theme.fontSizes.mediumFontText,
    fontWeight: 'bold',
    marginRight: '5%',
  },
  logOut: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '0%',
    left: '6%',
  },
  logOutText: {
    fontSize: theme.fontSizes.mediumFontText,
    fontWeight: 'bold',
    paddingLeft: '3%',
  },
});
