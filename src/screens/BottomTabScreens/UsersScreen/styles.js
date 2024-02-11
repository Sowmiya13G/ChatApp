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
  },
  chatList: {
    flex: 1,
    position:"relative",
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:"center",
    padding: '3%',
    backgroundColor: theme.backgroundColor.lightGray,
    marginVertical: 1,
    height: "10%"
    // borderRadius: wp('3%'),
    // margin: '4%',
    // marginBottom: '4%',
  },

  avatar: {
    width:40,
    height:40,
    borderRadius: 50,
    marginRight: 10,
  
  },
  msgDate: {
    position:"absolute",
    top:"15%",
    right:"3%",
display:"flex"

  },
  sentIcon:{
  position:"absolute",
  top:"80%",
  left:"80%",
display:"flex"
  },
  msgTime: {
    alignItems: 'flex-end',
  },
  addNewUser: {
    backgroundColor: theme.backgroundColor.white,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    fontWeight: 'bold',
    textTransform: "capitalize"
  },
  textmsg: {
    fontSize: theme.fontSizes.smallFont,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  iconsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '6%',
    right: '5%',

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
