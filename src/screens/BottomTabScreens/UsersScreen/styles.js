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
    alignItems: 'flex-start',
    padding: '3%',
    backgroundColor: theme.backgroundColor.lightGray,
    marginVertical: 1,
    height:"10%"
    // borderRadius: wp('3%'),
    // margin: '4%',
    // marginBottom: '4%',
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
  msgDate:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:"flex-end"

  },
  msgTime:{
alignItems:'flex-end',
  },
  addNewUser: {
    backgroundColor: theme.backgroundColor.white,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: '5%',
    // right: '5%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    fontWeight: 'bold',
    textTransform:"capitalize"
  },

  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // marginBottom: '5%',
  },
  iconsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '6%',
    right: '5%',
    // margin: '5%',
    // alignSelf: 'flex-end',
  },
  icon: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  header: {
    padding: '5%',
    // flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
