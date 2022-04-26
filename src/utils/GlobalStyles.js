import {StyleSheet, Text, View, Platform} from 'react-native';

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 20 : 0,
  },
});
