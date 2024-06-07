import {Platform} from 'react-native';

let URI = '';

if (Platform.OS === 'ios') {
  URI = '/api/v1';
} else {
  URI = 'http://192.168.1.12:8081/api/v1';
}

export {URI};
