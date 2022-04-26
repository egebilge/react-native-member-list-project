import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
// import GlobalStyle from '../utils/GlobalStyle';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {setName, setPassword, setTaskID, setTasks} from '../redux/action';

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

export default function Member({navigation, route}) {
  const {name, password, tasks, taskID} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    createTable();
    getData();
    getTasks();
  }, []);

  // create a function called "getTasks" so,
  // that we can display the saved tasks on this page.
  // like a "getData"
  // we use AsyncStorage to store data in Local Storage.
  const getTasks = () => {
    AsyncStorage.getItem('Tasks') // key name is Tasks
      // after reading the value, i parse it using JSON.
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        // now if this value existed and it was an object type, we can store it in the state.
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks)); // store value in getTasks
        }
      })
      .catch(err => console.log(err));
  };

  // To delete an one item,
  // we use the "id" to filter the "member list" to actually delete the list.
  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Member data removed successfully.');
      })
      .catch(err => console.log(err));
  };
  // To delete all item when you are sign out.
  const deleteAllTask = id => {
    const filteredTasks = tasks.filter(task => task.ID === id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
      })
      .catch(err => console.log(err));
  };

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT);',
      );
    });
  };

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

  const removeData = async () => {
    try {
      // await AsyncStorage.clear();
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const alertMsg = () => {
    Alert.alert(
      'Warning!',
      'You are about to log out, all your data will be deleted!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            deleteAllTask();
            removeData();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('ADD Member');
            }}>
            <View style={styles.item_row}>
              <View style={styles.item_body}>
                <Text style={styles.subtitle}>{item.N_Name} </Text>
                <Text style={styles.subtitle}>{item.N_Email}</Text>
                <Text style={styles.subtitle}>{item.N_Address}</Text>
                <Text style={styles.subtitle}>{item.N_Birthdate}</Text>
                <Text style={styles.subtitle}>{item.N_Entrancedate}</Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.ID);
                }}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}></FlatList>
      <TouchableOpacity
        style={styles.button}
        //in order to always have the latest task ID by pressing this button,
        //we use the tasks state and add one to its length.
        //Bu butona basarak, her zaman en son task_ID'ye sahip olmak için,
        //tasks state kullanılır ve uzunluğuna bir tane ekleriz.
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('ADD Member');
        }}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.exit_account_without_lost_data}
        onPress={() => {
          removeData();
        }}>
        <FontAwesome5
          name={'sign-out-alt'}
          size={35}
          color={'#ff3636'}></FontAwesome5>
      </TouchableOpacity>
      <Text>WITHOUT DATA LOSS</Text>
      <TouchableOpacity style={styles.exit_account} onPress={() => alertMsg()}>
        <FontAwesome5
          name={'sign-out-alt'}
          size={35}
          color={'#ff3636'}></FontAwesome5>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0080ff',
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete_view: {
    width: '100%',
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  exit_account: {
    position: 'absolute',
    bottom: 35,
    left: 50,
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#999999',
    margin: 3,
  },
});
