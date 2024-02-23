import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { color,fontSizes } from '../../constants/theme';

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
    color: color.secondaryBlack,
    fontSize: fontSizes.bigFont,
  },
  text: {
    color: color.secondaryBlack,
    opacity: 0.5,
    fontSize: fontSizes.mediumFontText,
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
    fontSize: fontSizes.mediumFontText,
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
    fontSize: fontSizes.mediumFontText,
    fontWeight: 'bold',
    paddingLeft: '3%',
  },
  profileImg: {
    width: wp('25%'),
    height: hp('12%'),
    borderRadius: wp('25%'),
  }
});
