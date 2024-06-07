import {Platform} from 'react-native';

let URI = '';

if (Platform.OS === 'ios') {
  URI = 'https://thread-clone-ewq9.onrender.com/api/v1';
} else {
  URI = 'https://thread-clone-ewq9.onrender.com/api/v1';
}

export {URI};
