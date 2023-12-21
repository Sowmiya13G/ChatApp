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
    padding: 10,
    borderRadius: 2,
    backgroundColor: 'grey',
    marginVertical: 1,
  },
  avatar: {
    width: 50,
    height: 50,
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
    bottom: '10%',
    right: '5%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
