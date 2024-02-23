import {StyleSheet} from 'react-native';

// Packages
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// constants
import { color, fontSizes } from '../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around',
    backgroundColor: color.themeBG,
    width: '100%',
    height: '100%',
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
    borderColor: color.candyBlue,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    backgroundColor: color.white,
    paddingLeft: 20,
    borderRadius: 50,
    color: '#000',
  },
  button: {
    backgroundColor: '#20d5d8',
    width: '85%',
    borderColor: color.candyBlue,
    borderWidth: 1,
    height: 50,
    color: color.white,
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
    backgroundColor: color.white,
  },
  signuplabel: {
    color: '#cacbcf',
    backgroundColor: color.white,
    padding: 10,
    position: 'absolute',
    backgroundColor: '#f9f9f5',
  },
  buttonConatiner: {
    width: '80%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  signUp: {
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: '#cacbcf',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
