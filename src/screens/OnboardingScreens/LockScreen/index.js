import React, { useState } from 'react';
import {
    View,
    Text,
    ToastAndroid
} from 'react-native';

// Packages
import { useNavigation } from '@react-navigation/native';
import PatternLock from 'react-pattern-lock';
import TouchID from 'react-native-touch-id';
import Biometrics from 'react-native-biometrics';

// Styles
import { styles } from './styles';

// Components
import CommonButton from '../../../components/CommonButton';
import Spacer from '../../../components/Spacer/index';

// Services
import { checkAndRequestPermissions } from '../../../utils/androidPermissions';

const LockScreen = () => {
    // Variables
    // const navigation = useNavigation();

    // // Use State
    // const [pattern, setPattern] = useState('');

    // // Functions
    // const handlePatternComplete = (pattern) => {
    //     setPattern(pattern);
    // }
    // const handleTouchIDAuthentication = () => {
    //     TouchID.authenticate('Unlock with Touch ID')
    //         .then(() => {
    //             // Touch ID authentication successful
    //             Alert.alert('Touch ID Authentication', 'Authentication Successful');
    //         })
    //         .catch((error) => {
    //             // Touch ID authentication failed
    //             console.log(error);
    //             Alert.alert('Touch ID Authentication', 'Authentication Failed');
    //         });
    // };
    // // Use effect
    // useEffect(() => {
    //     Biometrics.isSensorAvailable().then((result) => {
    //         if (result === Biometrics.TouchID || result === Biometrics.FaceID) {
    //         }
    //     });
    // }, []);
    // render UI ........
    return (
        <View>
            <Text>Unlock App</Text>
            {/* <PatternLock
                size={3}
                onReset={() => setPattern('')}
                onComplete={handlePatternComplete}
                errorColor="red"
            />
            <TouchableOpacity onPress={handleTouchIDAuthentication}>
                <Text>Use Touch ID</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default LockScreen;
