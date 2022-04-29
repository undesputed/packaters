import React, { Component, useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./Component/loader";

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!username) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {username: username, password: userPassword};

    fetch('http://192.168.0.173:3000/api/user/login', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type':
        // 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: JSON.stringify({
        username: username,
        password: userPassword
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);

        console.log(responseJson[0].id);

        AsyncStorage.setItem('user_id', responseJson[0].username);

        navigation.replace('DrawerNavigationRoutes');
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.headerContainer}>
          <Image resizeMode='contain' style={styles.logo} source={require('../Image/logo.png')}/>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.loginLabel}>
            <Text style={styles.label}>LOGIN</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="username"
              placeholderTextColor="#e48f24"
              onChangeText={(email) => setUsername(email)}
            />
          </View>
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#e48f24"
              secureTextEntry={true}
              onChangeText={(password) => setUserPassword(password)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmitPress}>
            <View>
              <Text style={{ color: 'white', letterSpacing: 3 }}>LOG IN</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.regContainer}>
            <Text style={{ color: 'black' }}>New Here? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: '33.333%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  bodyContainer: {
    position: 'relative',
    width: '100%',
    height: '33.333%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: '33.333%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'purple',
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    height: '95%',
    width: '95%',
  },
  inputView: {
    width: '90%',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,1)',
    borderStyle: 'solid',
    position: 'relative',
    margin: 10,
    borderRadius: 5
  },
  TextInput: {
    color: 'black'
  },
  loginLabel: {
    position: 'relative',
    margin: 10,
  },
  label: {
    fontSize: 25,
    fontFamily: "roboto-500",
    fontWeight: 'bold',
    letterSpacing: 5,
    color: 'black'
  },
  loginButton: {
    position: 'relative',
    width: '90%',
    height: 45,
    backgroundColor: '#e48f24',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  regContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    margin: 10
  }
});

export default LoginScreen;
