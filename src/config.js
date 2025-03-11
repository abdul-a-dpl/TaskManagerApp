import { Platform } from 'react-native';

export const API_URL = Platform.select({
  android: 'http://10.0.2.2:5000',
  ios: 'http://localhost:5000',
}); 