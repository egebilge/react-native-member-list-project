import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Member from './src/screens/Member';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import CreateMember from './src/screens/CreateMember';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="My Member List" component={Member} />
          <Stack.Screen name="ADD Member" component={CreateMember} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
