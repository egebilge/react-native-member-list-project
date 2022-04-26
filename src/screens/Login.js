import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setPassword} from '../redux/action';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Login({navigation}) {
  const {name, password} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // 10 saniye boyunca bir data girilmezse uyarı ver.
  const getDataErrorMsg = () => {
    Alert.alert('Warning', 'Please write your data in 10 sec.');
  };

  useEffect(() => {
    createTable();
    getData();
    // setTimeout(() => {
    //   getDataErrorMsg();
    //   navigation.replace('Login');
    // }, 10000);
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT);',
      );
    });
  };

  //veriyi düzenlediğimiz
  const setData = async () => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setPassword(password));
        // var user = {
        //     Name: name,
        //     Age: age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));
        await db.transaction(async tx => {
          // await tx.executeSql(
          //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
          // );
          await tx.executeSql(
            'INSERT INTO Users (Name, Password) VALUES (?,?)',
            [name, password],
          );
        });
        navigation.navigate('My Member List');
      } catch (error) {
        console.log(error);
      }
    }
  };

  // veriyi seçip okuduğumuz
  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Password FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('My Member List');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const goMemberPage = () => {
  //   navigation.navigate('Member');
  // };

  return (
    <View style={styles.body}>
      <Image
        style={styles.image_size}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2012/04/26/19/44/members-42919_1280.png',
        }}
      />
      <View>
        <Text style={styles.text}> MemberListApp </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your name:"
        onChangeText={value => dispatch(setName(value))}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter your password:"
        onChangeText={value => dispatch(setPassword(value))}
        secureTextEntry></TextInput>
      <CustomButton title="Login" color="#1eb900" onPressFunction={setData} />
      {/* <CustomButton
        title="MemberList"
        color="#1eb900"
        onPressFunction={setData}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },

  image_size: {
    width: 300,
    height: 200,
    borderRadius: 50,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    margin: 25,
  },
  input: {
    height: 30,
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
