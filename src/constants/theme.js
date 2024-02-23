import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const screenHeight = hp('100%');
const screenWidth = wp('100%');

const color = {
  // Black 
  black: '#000000',
  darkBackground: '#121212',
  dark: '#303030',
  secondaryBlack: '#292929',
  inkBlack: '#252A31',
  text: '#171717',
  
  // White
  white: '#FFFFFF',
  primary: '#FAFAFA',
  themeBG: '#f9f9f5',
  text: '#ECEFF4',

  // Gray
  gray: '#CCCCCC',
  lightGray: '#E5E4E2',
  hexGray: '#999999',
  border: '#bdbdbd',
  background: '#2E3440',
  border: '#575c66',
  backgroundAlt: '#575c66',
  borderAlt: '#2E3440',
  borderAlt: '#bdbdbd',
  candyBlue: '#eeeeee',
  background: '#ededed',
  backgroundAlt: '#eaeaeb',

  // Others
  inkLight: '#697D95',
  candyBlue: '#37ECBA',
  orange: '#E47718',
  green: '#008000',
};

const fontSizes = {
  bigFont: hp('3%'),
  mediumFont: hp('2%'),
  smallFont: hp('1.5%'),
  bigFontText: hp('3.5%'),
  mediumFontText: hp('2.5%'),
  smallFontText: hp('1.8%'),
};

export {
  fontSizes,
  screenHeight,
  screenWidth,
  color
};
