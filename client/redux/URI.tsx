import {Platform} from 'react-native';

let URI = '';

if (Platform.OS === 'ios') {
  URI = 'https://thread-clone-pink-nu.vercel.app/api/v1';
} else {
  URI = 'https://thread-clone-pink-nu.vercel.app/api/v1';
}

export {URI};
