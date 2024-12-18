import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddEditNoteScreen from '../screens/AddEditNoteScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          headerStyle:{
            backgroundColor:'#111',
            
          },
          headerTitleStyle:{
            color:'#f5f5f5',
          },
          headerTintColor:'#f5f5f5',
        }} 
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"Quick Notes"}} />
        <Stack.Screen name="AddEditNote" component={AddEditNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

