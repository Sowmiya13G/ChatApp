import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

export const checkAndRequestPermissions = async () => {
  const readExternalStoragePermission = await check(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  );
  const writeExternalStoragePermission = await check(
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  );

  if (readExternalStoragePermission !== RESULTS.GRANTED) {
    await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }

  if (writeExternalStoragePermission !== RESULTS.GRANTED) {
    await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  }
};

export const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save screenshots.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.error('Error requesting storage permission:', err);
  }
};

requestExternalStoragePermission();

export const checkFingerprintPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.USE_FINGERPRINT);

  if (result === RESULTS.DENIED) {
    requestFingerprintPermission();
  }
};

export const requestFingerprintPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.USE_FINGERPRINT);

  if (result === RESULTS.GRANTED) {
    console.log('Fingerprint permission granted');
  } else {
    console.log('Fingerprint permission denied');
  }
};
