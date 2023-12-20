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
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.backgroundColor.themeBG,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#000',
    marginVertical: 60,
    fontSize: 50,
    fontWeight: 'bold',
    // backgroundColor:'green'
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputfiled: {
    width: '85%',
    borderColor: theme.borderColor.candyBlue,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    backgroundColor: theme.backgroundColor.white,
    paddingLeft: 20,
    borderRadius: 50,
    color: '#000',
  },
  button: {
    backgroundColor: '#20d5d8',
    width: '85%',
    borderColor: theme.borderColor.candyBlue,
    borderWidth: 1,
    height: 50,
    color: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 20,
    borderRadius: 50,
  },
  loginbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnlabel: {
    fontSize: 15,
    // fontWeight: 'bold',
    letterSpacing: 3,
    color: '#fff',
  },
  textlabel: {
    marginVertical: 20,
    fontSize: 15,
    color: '#000',
  },
  signbtn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 50,
    borderColor: '#20d5d8',
    backgroundColor: theme.backgroundColor.white,
  },
  signuplabel: {
    color: '#cacbcf',
    backgroundColor: theme.backgroundColor.white,
    padding: 10,
    position: 'absolute',
    backgroundColor: '#f9f9f5',
  },
});
