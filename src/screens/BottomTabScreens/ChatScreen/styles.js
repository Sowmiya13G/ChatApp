import {StyleSheet} from 'react-native';

// Packages
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// constants
import {color, fontSizes} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  bodyContainer: {
    padding: '5%',
  },
  text: {
    color: '#007BFF',
    fontSize: fontSizes.mediumFont,
    fontWeight: 'bold',
  },
  sendContainer: {
    position: 'absolute',
    right: '5%',
    justifyContent: 'center',
  },
  input: {
    color: color.black,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  userAvatar: {
    width: wp('10%'),
    height: hp('5%'),
    borderRadius: wp('5%'),
    marginRight: 10,
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    minHeight: hp('8%'),
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingVertical: 4,
    paddingHorizontal: wp(5),
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginRight: 20,
  },
});
