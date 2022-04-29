import React, { Component, useState, useEffect, createRef } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";

const RegisterScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [confirm, setComfirm] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
      setErrorText('');
        setLoading(true);
        if(userPassword === confirm){
          fetch('http://192.168.0.173:3000/api/user/registration', {
              method: 'POST',
              headers: {
                //Header Defination
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type':
                // 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                phonenum: phonenum,
                address: userAddress,
                username: username,
                password: userPassword,
              }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                console.log(responseJson);
                console.log('Registration Success. Please Login to proceed');
                alert('Registration Success');
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
        }else {
          alert('Password does not match');
        }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../Image/logo.png')} resizeMode="contain"/>
          <Text style={styles.regLabel}>REGISTRATION</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor="#e48f24"
              onChangeText={(fname) => setFirstname(fname)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              placeholderTextColor="#e48f24"
              onChangeText={(lname) => setLastname(lname)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone Number"
              placeholderTextColor="#e48f24"
              onChangeText={(PhoneNumber) => setPhonenum(PhoneNumber)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Address"
              placeholderTextColor="#e48f24"
              onChangeText={(Address) => setUserAddress(Address)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#e48f24"
              onChangeText={(email) => setUsername(email)}
            />
          </View>
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#e48f24"
              secureTextEntry={true}
              onChangeText={(password) => setUserPassword(password)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#e48f24"
              secureTextEntry={true}
              onChangeText={(Confirm) => setComfirm(Confirm)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmitButton} style={styles.registerButton}>
            <Text style={styles.registerLabel}>REGISTER</Text>
          </TouchableOpacity>
          <View style={styles.loginButton}>
            <Text style={{ color: 'black' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  // Start of Logo Container
  logoContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
  },
  regLabel:{
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 3,
    color: 'black'
  },
  // End of Logo Container

  // Start of Input Container
  inputContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  inputView: {
    width: '90%',
    height: 40,
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
  // End of Input Container
  // Start of Button Container
  buttonContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    width: '90%',
    height: 40,
    backgroundColor: '#e48f24',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderStyle: 'solid'
  },
  registerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  }
});

export default RegisterScreen;
