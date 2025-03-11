import { Platform } from 'react-native';

const LOCAL_IP = '192.168.31.214'; // Your machine's IP address

const DEV_API_URL = Platform.select({
    ios: `http://${LOCAL_IP}:5000`,
    android: `http://${LOCAL_IP}:5000`, // Use local IP for both iOS and Android when testing on real devices
});
// Use DEV_API_URL when in development mode, PROD_API_URL when in production
export const API_URL = __DEV__ ? DEV_API_URL : DEV_API_URL; 