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
  },
  chatList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    borderRadius: wp('3%'),
    backgroundColor: 'grey',
    marginVertical: 1,
    margin: '4%',
    marginBottom: '4%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewUser: {
    position: 'absolute',
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '5%',
    right: '5%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    fontWeight: 'bold',
  },
  // icon: {
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  // },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  icon: {
    alignItems: 'center',
    paddingVertical: 5,
  },
});
