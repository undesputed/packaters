import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './drawerScreens/HomeScreen';
import CustomSidebarMenu from './Component/CustomSideBarMenu';
import NavigationDrawerHeader from './Component/NavigationDrawerHeader';
import MenuScreen from './drawerScreens/MenuScreen';
import TransactionHistoryScreen from './drawerScreens/TransactionHistory';
import ProfileScreen from './drawerScreens/ProfileScreen';
import CatererScreen from './drawerScreens/CatererScreen';

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
                        backgroundColor: '#e48f24',
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


  const MenuScreenStack = ({navigation}) => {
    return(
      <Stack.Navigator
        initialRouteName='="MenuScreen'
        screenOptions={{ 
          headerStyle:{
            backgroundColor: '#e48f24',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
         }}>
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{
              title: 'Menu', //Set Header Title
              headerLeft: () => (
                <NavigationDrawerHeader navigationProps={navigation} />
            ),
            }}
          />
      </Stack.Navigator>
    );
  };

  const TransactionHistoryScreenStack = ({navigation}) => {
    return(
      <Stack.Navigator 
        initialRouteName='TransactionHistoryScreen'
        screenOptions={{ 
          headerStyle:{
            backgroundColor: '#e48f24',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
         }}>   
          <Stack.Screen
            name="TransactionHistoryScreen"
            component={TransactionHistoryScreen}
            options={{
              title: 'History', //Set Header Title
              headerLeft: () => (
                <NavigationDrawerHeader navigationProps={navigation} />
            ),
            }}
          />
      </Stack.Navigator>
    )
  }

  const ProfileScreenStack = ({navigation}) => {
    return(
      <Stack.Navigator
        initialRouteName='ProfileScreen'
        screenOptions={{ 
          headerStyle:{
            backgroundColor: '#e48f24',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
         }}>
           <Stack.Screen
            name="ProfielScreen"
            component={ProfileScreen}
            options={{
              title: 'Profile', //Set Header Title
              headerLeft: () => (
                <NavigationDrawerHeader navigationProps={navigation} />
            ),
            }}
          />
      </Stack.Navigator>
    )
  }

  const CatererScreenStack = ({navigation}) => {
    return(
      <Stack.Navigator 
        initialRouteName='CatererScreenStack'
        screenOptions={{ 
          headerStyle:{
            backgroundColor: '#e48f24',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
         }}>   
          <Stack.Screen
            name="CatererScreen"
            component={CatererScreen}
            options={{
              title: 'Caterers', //Set Header Title
              headerLeft: () => (
                <NavigationDrawerHeader navigationProps={navigation} />
            ),
            }}
          />
      </Stack.Navigator>
    )
  }


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
          name="Home"
          screenOptions={{drawerLabel: 'Home Screen'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="Menu"
          screenOptions={{drawerLabel: 'Menu Screen'}}
          component={MenuScreenStack}
        />
        <Drawer.Screen
          name="Caterer"
          screenOptions={{ drawerLabel: 'Caterer Screen' }}
          component={CatererScreenStack}
        />
        <Drawer.Screen
          name="Transaction History"
          screenOptions={{drawerLabel: 'Transaction History Screen'}}
          component={TransactionHistoryScreenStack}
        />
        <Drawer.Screen
          name="Profile"
          screenOptions={{drawerLabel: 'Profile Screen'}}
          component={ProfileScreenStack}
        />
      </Drawer.Navigator>
    );
  };
  
  export default DrawerNavigatorRoutes;