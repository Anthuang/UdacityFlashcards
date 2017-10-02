import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  iosBtn: {
    padding: 10,
    marginBottom: 2,
    borderRadius: 7,
    height: 45,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AndroidBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 2,
    borderRadius: 2,
    height: 45,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const inputStyles = StyleSheet.create({
  iosInput: {
    height: 50,
    width: 200,
    padding: 10,
    borderColor: '#ababab',
    borderWidth: 1,
    borderRadius: 7,
  },
  AndroidInput: {
    height: 50,
    width: 200,
    padding: 10,
  },
});
