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
        paddingTop: Platform.OS === 'android' ? 0 : 0,
    },
    bodyContainer: {
        padding: '5%',
    },
    text: {
        color: '#007BFF',
        fontSize: theme.fontSizes.mediumFont,
        fontWeight: 'bold'
    },
    sendContainer: {
        position: 'absolute',
        right: '5%',
        justifyContent: 'center'
    },
    input: {
        color: theme.fontColors.black
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
        alignSelf: 'center'
    },
});
