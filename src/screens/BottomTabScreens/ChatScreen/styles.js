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
        color: '#22313f',
        fontSize: theme.fontSizes.mediumFont,
        fontWeight: 'bold'
    },
    sendContainer: {
        position: 'absolute',
        right: '3%',
        justifyContent:"center",
        // marginBottom:wp("90%")
        bottom:"10%",
        // backgroundColor:"red"
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
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('5%'),
        marginRight: 10,
        alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        minHeight: hp("8%"),
        alignItems: 'center',
        backgroundColor: "grey",
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
        textTransform: "capitalize"
    },
    backIcon: {
        alignSelf: 'flex-start',
        marginRight: 20
    },
});
