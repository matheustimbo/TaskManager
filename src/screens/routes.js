import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import TasksList from './TasksList';
import TaskDetails from './TaskDetails';
import CreateTask from './CreateTask';

import {FirebaseProvider} from '../providers/FirebaseProvider';
const Stack = createStackNavigator();

export default function App() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            options={{
              gestureEnabled: false,
            }}
            name="TasksList"
            component={TasksList}
          />
          <Stack.Screen
            options={{
              gestureEnabled: false,
            }}
            name="TaskDetails"
            component={TaskDetails}
          />
          <Stack.Screen name="CreateTask" component={CreateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}
