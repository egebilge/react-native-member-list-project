import {StyleSheet, Text, View, Platform} from 'react-native';

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 20 : 0,
  },
  androidInput: {
    height: Platform.OS === 'android' ? 45 : 35,
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
