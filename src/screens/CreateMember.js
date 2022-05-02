import {StyleSheet, Text, View, TextInput, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../utils/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks, getMemberData} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateMember({navigation}) {
  const {tasks, taskID, g_memberData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [newName, setnewName] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [newAddress, setnewAddress] = useState('');
  const [newBirthdate, setnewBirthdate] = useState('');
  const [newEntrancedate, setnewEntrancedate] = useState('');

  const [nameValidError, setNameValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [birthdateValidError, setBirthdateValidError] = useState('');
  const [entrancedateValidError, setEntrancedateValidError] = useState('');

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let today = new Date();
    let date =
      today.getDate() +
      '.' +
      (today.getMonth() + 1) +
      '.' +
      today.getFullYear();
    findValueOfDesiredTask();
    dispatch(getMemberData());
    setCurrentDate(date);
  }, []);

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email address: [a-Z@.] ');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const handleValidName = val => {
    let rjx = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    if (val.length === 0) {
      setNameValidError('name must be enter');
    } else if (rjx.test(val) === false) {
      setNameValidError('enter valid name: [a-Z a-Z]');
    } else if (rjx.test(val) === true) {
      setNameValidError('');
    }
  };

  const handleValidBirthdate = val => {
    let reg = /^\d{2}[.]\d{2}[.]\d{4}$/;
    if (val.length === 0) {
      setBirthdateValidError('birthdate must be enter');
    } else if (reg.test(val) === false) {
      setBirthdateValidError('enter valid birthdate: [*01.01.2001]');
    } else if (reg.test(val) === true) {
      setBirthdateValidError('');
    }
  };

  const handleValidEntrancedate = val => {
    let reg = /^\d{2}[.]\d{2}[.]\d{4}$/;
    if (val.length === 0) {
      setEntrancedateValidError('entrancedate must be enter');
    } else if (reg.test(val) === false) {
      setEntrancedateValidError('enter valid entrancedate: [*01.01.2001]');
    } else if (reg.test(val) === true) {
      setEntrancedateValidError('');
    }
  };

  // when we click some member in a list,
  // we will find to value of desired member !!.
  const findValueOfDesiredTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setnewName(Task.N_Name);
      setnewEmail(Task.N_Email);
      setnewAddress(Task.N_Address);
      setnewBirthdate(Task.N_Birthdate);
      setnewEntrancedate(Task.N_Entrancedate);
    }
  };

  const setAddNewTask = () => {
    let regN = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    let isValidName = regN.test(newName);
    let regE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let isValidEmail = regE.test(newEmail);
    let regB = /^\d{2}[.]\d{2}[.]\d{4}$/;
    let isValidBirthdate = regB.test(newBirthdate);
    let regD = /^\d{2}[.]\d{2}[.]\d{4}$/;
    let isValidEntrancedate = regD.test(newEntrancedate);

    if (newName.length == 0 || !isValidName) {
      Alert.alert('Warning', 'Please write your name correctly.');
    } else if (newEmail.length == 0 || !isValidEmail) {
      Alert.alert('Warning', 'Please write your email correctly.');
    } else if (newAddress.length == 0) {
      Alert.alert('Warning', 'Please write your address correctly.');
    } else if (newBirthdate.length == 0 || !isValidBirthdate) {
      Alert.alert('Warning', 'Please write your birthdate correctly.');
    } else if (newEntrancedate.length == 0 || !isValidEntrancedate) {
      Alert.alert('Warning', 'Please write your entrancedate correctly.');
    } else {
      try {
        var newValueTask = {
          ID: taskID,
          N_Name: newName,
          N_Email: newEmail,
          N_Address: newAddress,
          N_Birthdate: newBirthdate,
          N_Entrancedate: newEntrancedate,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = []; // newTasks --> boş bir küme
        // if (there is a member in the list), i will update it with a new object
        // else if it doesn't exist, i will add it to the bottom of the list.
        if (index > -1) {
          newTasks = [...tasks]; // newTasks --> tasks içindeki verileri(name,address..) kapsayan dolu bir küme.
          newTasks[index] = newValueTask;
          Alert.alert('Success', 'Member data updated successfully.');
        }
        // we add this object to the end of the previous tasks.
        // let newTasks = [...tasks, newValueTask]; // önceki tasks(value)'dan sonra (newValueTask)'i ekle. Hep en sona eklenmiş olur.
        else {
          newTasks = [...tasks, newValueTask];
          // liste uzunluğu 3 den büyükse, yeni liste ekletme.
          if (newTasks.length > 3) {
            newTasks = [...tasks];
            Alert.alert('Warning!', 'You cannot add more member in a list.');
          } else {
            // newTasks = [...tasks, newValueTask];
            Alert.alert('Success', 'Member data saved successfully.');
          }
        }
        // now using AsyncStorage, we save the list of new tasks on the "Tasks" key using JSON.
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks)); // newTasks value, store in setTasks(state).
            // Alert.alert('Success', 'Member data saved successfully.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        value={newName}
        style={styles.input}
        placeholder={'Name'}
        onChangeText={value => {
          handleValidName(value);
          setnewName(value);
        }}
      />
      {nameValidError ? <Text>{nameValidError}</Text> : null}
      <TextInput
        value={newEmail}
        style={styles.input}
        placeholder={'Email'}
        onChangeText={value => {
          handleValidEmail(value);
          setnewEmail(value);
        }}
      />
      {emailValidError ? <Text>{emailValidError}</Text> : null}
      <TextInput
        value={newAddress}
        style={styles.input}
        placeholder={'Address'}
        onChangeText={value => setnewAddress(value)}
        multiline
      />
      <TextInput
        value={newBirthdate}
        style={styles.input}
        placeholder={'Birthdate'}
        keyboardType={'numbers-and-punctuation'}
        onChangeText={value => {
          handleValidBirthdate(value);
          setnewBirthdate(value);
        }}
      />
      {birthdateValidError ? <Text>{birthdateValidError}</Text> : null}
      <TextInput
        value={newEntrancedate}
        style={styles.input}
        placeholder={'Entrancedate'}
        keyboardType={'numbers-and-punctuation'}
        onChangeText={value => {
          handleValidEntrancedate(value);
          setnewEntrancedate(value);
        }}
      />
      {entrancedateValidError ? <Text>{entrancedateValidError}</Text> : null}
      <Text>Today: {currentDate}</Text>
      <CustomButton
        color="#1eb900"
        title="Save Member"
        onPressFunction={setAddNewTask}
      />

      <FlatList
        data={g_memberData}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>Fetch data from API</Text>
            <Text style={styles.subtitle}>Name: {item.name}</Text>
            <Text style={styles.subtitle}>Email: {item.email}</Text>
            <Text style={styles.subtitle}>Address: {item.address}</Text>
            <Text style={styles.subtitle}>Birthdate: {item.birthdate}</Text>
            <Text style={styles.subtitle}>Entrancedate: {item.enterdate}</Text>
            <TextInput
              style={styles.input}
              placeholder={'Entrancedate'}
              keyboardType={'numbers-and-punctuation'}>
              {item.name} + {item.email}
            </TextInput>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10, //fix to bracket position.
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999999',
  },
});
