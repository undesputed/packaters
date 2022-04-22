import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './drawerScreens/HomeScreen';
import SettingsScreen from './drawerScreens/SettingScreen';
import CustomSidebarMenu from './Component/CustomSideBarMenu';
import NavigationDrawerHeader from './Component/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
    return(
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Home Screen',
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle:{
                        backgroundColor: '#307ecc',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const SettingScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="SettingsScreen"
        screenOptions={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: 'Settings', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

  const DrawerNavigatorRoutes = (props) => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#cee1f2',
          color: '#cee1f2',
          itemStyle: {marginVertical: 5, color: 'white'},
          labelStyle: {
            color: '#d8d8d8',
          },
        }}
        screenOptions={{ headerShown: false }}
        drawerContent={CustomSidebarMenu}>
        <Drawer.Screen
          name="HomeScreenStack"
          screenOptions={{drawerLabel: 'Home Screen'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="SettingScreenStack"
          screenOptions={{drawerLabel: 'Setting Screen'}}
          component={SettingScreenStack}
        />
      </Drawer.Navigator>
    );
  };
  
  export default DrawerNavigatorRoutes;