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

  useEffect(() => {
    getAddNewTask();
    dispatch(getMemberData());
  }, []);
  // when we click some member in a list,
  // we will find to value of desired member !!.
  const getAddNewTask = () => {
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
    if (
      newName.length == 0 ||
      newEmail.length == 0 ||
      newAddress.length == 0 ||
      newBirthdate.length == 0 ||
      newEntrancedate.length == 0
    ) {
      Alert.alert('Warning', 'Please write your data.');
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
        //we add this object to the end of the previous tasks.
        // let newTasks = [...tasks, newValueTask]; // önceki tasks(value)'dan sonra (newValueTask)'i ekle. Hep en sona eklenmiş olur.
        else {
          newTasks = [...tasks, newValueTask];
          // liste uzunluğu 3 den büyükse, yeni liste ekletme.
          if (newTasks.length > 3) {
            Alert.alert('Warning!', 'You cannot add more member in a list.');
            newTasks = [...tasks];
          } else {
            newTasks = [...tasks, newValueTask];
            Alert.alert('Success', 'Member data saved successfully.');
          }
        }
        //now using AsyncStorage, we save the list of new tasks on the "Tasks" key using JSON.
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks)); // newTasks value, store in setTasks(state).
            //Alert.alert('Success', 'Member data saved successfully.');
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
        onChangeText={value => setnewName(value)}></TextInput>
      <TextInput
        value={newEmail}
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={value => setnewEmail(value)}></TextInput>
      <TextInput
        value={newAddress}
        style={styles.input}
        placeholder={'Address'}
        onChangeText={value => setnewAddress(value)}
        multiline></TextInput>
      <TextInput
        value={newBirthdate}
        style={styles.input}
        placeholder={'Birthdate'}
        keyboardType={'numbers-and-punctuation'}
        onChangeText={value => setnewBirthdate(value)}></TextInput>
      <TextInput
        value={newEntrancedate}
        style={styles.input}
        placeholder={'Entrancedate'}
        keyboardType={'numbers-and-punctuation'}
        onChangeText={value => setnewEntrancedate(value)}></TextInput>
      <CustomButton
        color="#1eb900"
        title="Save Member"
        onPressFunction={setAddNewTask}></CustomButton>
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
