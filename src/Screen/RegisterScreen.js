// import React, {useState, createRef} from 'react';
// import {
//     StyleSheet,
//     TextInput,
//     View,
//     Text,
//     Image,
//     KeyboardAvoidingView,
//     Keyboard,
//     TouchableOpacity,
//     ScrollView,
// } from 'react-native';

// import Loader from './Component/loader';

// const RegisterScreen = (props) => {
    // const [username, setUsername] = useState('');
    // const [firstname, setFirstname] = useState('');
    // const [lastname, setLastname] = useState('');
    // const [phonenum, setPhonenum] = useState('');
    // const [userAge, setUserAge] = useState('');
    // const [userAddress, setUserAddress] = useState('');
    // const [userPassword, setUserPassword] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [errorText, setErrorText] = useState('');
    // const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    // const emailInputRef = createRef();
    // const ageInputRef = createRef();
    // const addressInputRef = createRef();
    // const passwordInputRef = createRef();

    // const handleSubmitButton = () => {
    //     setErrorText('');
    //     // if(!username){
    //     //     alert('Please Fill Username');
    //     //     return;
    //     // }
    //     // if (!userEmail) {
    //     //     alert('Please fill Email');
    //     //     return;
    //     //   }
    //     //   if (!userAge) {
    //     //     alert('Please fill Age');
    //     //     return;
    //     //   }
    //     //   if (!userAddress) {
    //     //     alert('Please fill Address');
    //     //     return;
    //     //   }
    //     //   if (!userPassword) {
    //     //     alert('Please fill Password');
    //     //     return;
    //     //   }

    //       setLoading(true);
    //       fetch('http://192.168.0.173:3000/api/user/registration', {
    //           method: 'POST',
    //           headers: {
    //             //Header Defination
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             // 'Content-Type':
    //             // 'application/x-www-form-urlencoded;charset=UTF-8',
    //           },
    //           body: JSON.stringify({
    //             firstname: firstname,
    //             lastname: lastname,
    //             phonenum: phonenum,
    //             address: userAddress,
    //             username: username,
    //             password: userPassword,
    //           }),
    //       })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             setLoading(false);
    //             console.log(responseJson);
    //             setIsRegistrationSuccess(true);
    //             console.log('Registration Success. Please Login to proceed');
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error(error);
    //         });
    // };

    // if(isRegistrationSuccess){
    //     return(
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: '#307ecc',
    //                 justifyContent: 'center',
    //             }}>
    //                 <Image
    //                     source={require('../Image/logo.png')}
    //                     style={{
    //                         height: 150,
    //                         resizeMode: 'contain',
    //                         alignSelf: 'center'}}/>
    //                 <Text style={styles.successTextStyle}>Registration Successful</Text>
    //                 <TouchableOpacity
    //                     style={styles.buttonStyle}
    //                     activeOpacity={0.5}
    //                     onPress={() => props.navigation.navigate('LoginScreen')}>
    //                         <Text style={styles.buttonTextSTyle}>Login Now</Text>
    //                 </TouchableOpacity>
    //         </View>
    //     );
    // }

//     return(
//         <View style={{flex: 1, backgroundColor: '#307ecc'}}>
//             <Loader loading={loading} />
//             <ScrollView
//                 keyboardShouldPersistTaps="handled"
//                 contentContainerStyle={{
//                     justifyContent: 'center',
//                     alignContent: 'center',
//                 }}>
//                     <View style={{alignItems: 'center'}}>
//                         <Image
//                             source={require('../Image/logo.png')}
//                             style={{
//                                 width: '50%',
//                                 height: 100,
//                                 resizeMode: 'contain',
//                                 margin: 30
//                             }}
//                         />
//                     </View>
//                     <KeyboardAvoidingView enabled>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                                 style={styles.inputStyle}
//                                 onChangeText={(FirstName) => setFirstname(FirstName)}
//                                 underlineColorAndroid="#f000"
//                                 placeholder='Enter FirstName'
//                                 placeholderTextColor= '#8b9cb5'
//                                 returnKeyType='next'
//                                 autoCapitalize='sentences'
//                                 blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                                 style={styles.inputStyle}
//                                 onChangeText={(LastName) => setLastname(LastName)}
//                                 underlineColorAndroid="#f000"
//                                 placeholder='Enter FirstName'
//                                 placeholderTextColor= '#8b9cb5'
//                                 autoCapitalize='sentences'
//                                 returnKeyType='next'
//                                 blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                                 style={styles.inputStyle}
//                                 onChangeText={(UserName) => setUsername(UserName)}
//                                 underlineColorAndroid="#f000"
//                                 placeholder='Enter Username'
//                                 placeholderTextColor= '#8b9cb5'
//                                 autoCapitalize='sentences'
//                                 returnKeyType='next'
//                                 onSubmitEditing={() => emailInputRef && emailInputRef.focus()}
//                                 blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                             style={styles.inputStyle}
//                             onChangeText={(PhoneNum) => setPhonenum(PhoneNum)}
//                             underlineColorAndroid="#f000"
//                             placeholder="Enter Phone Number"
//                             placeholderTextColor="#8b9cb5"
//                             ref={emailInputRef}
//                             returnKeyType="next"
//                             onSubmitEditing={() =>
//                                 passwordInputRef.current &&
//                                 passwordInputRef.current.focus()
//                             }
//                             blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                             style={styles.inputStyle}
//                             onChangeText={(UserPassword) =>
//                                 setUserPassword(UserPassword)
//                             }
//                             underlineColorAndroid="#f000"
//                             placeholder="Enter Password"
//                             placeholderTextColor="#8b9cb5"
//                             ref={passwordInputRef}
//                             returnKeyType="next"
//                             secureTextEntry={true}
//                             onSubmitEditing={() =>
//                                 ageInputRef.current &&
//                                 ageInputRef.current.focus()
//                             }
//                             blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.SectionStyle}>
//                             <TextInput
//                             style={styles.inputStyle}
//                             onChangeText={(UserAddress) =>
//                                 setUserAddress(UserAddress)
//                             }
//                             underlineColorAndroid="#f000"
//                             placeholder="Enter Address"
//                             placeholderTextColor="#8b9cb5"
//                             autoCapitalize="sentences"
//                             ref={addressInputRef}
//                             returnKeyType="next"
//                             onSubmitEditing={Keyboard.dismiss}
//                             blurOnSubmit={false}
//                             />
//                         </View>
//                         {errorText != '' ? (
//                             <Text style={styles.errorTextStyle}>
//                             {errorText}
//                             </Text>
//                         ) : null}
//                         <TouchableOpacity
//                             style={styles.buttonStyle}
//                             activeOpacity={0.5}
//                             onPress={handleSubmitButton}>
//                             <Text style={styles.buttonTextStyle}>REGISTER</Text>
//                         </TouchableOpacity>
//                     </KeyboardAvoidingView>
//             </ScrollView>
//         </View>
//     );
// }

// export default RegisterScreen;

// const styles = StyleSheet.create({
//     SectionStyle: {
//       flexDirection: 'row',
//       height: 40,
//       marginTop: 20,
//       marginLeft: 35,
//       marginRight: 35,
//       margin: 10,
//     },
//     buttonStyle: {
//       backgroundColor: '#7DE24E',
//       borderWidth: 0,
//       color: '#FFFFFF',
//       borderColor: '#7DE24E',
//       height: 40,
//       alignItems: 'center',
//       borderRadius: 30,
//       marginLeft: 35,
//       marginRight: 35,
//       marginTop: 20,
//       marginBottom: 20,
//     },
//     buttonTextStyle: {
//       color: '#FFFFFF',
//       paddingVertical: 10,
//       fontSize: 16,
//     },
//     inputStyle: {
//       flex: 1,
//       color: 'white',
//       paddingLeft: 15,
//       paddingRight: 15,
//       borderWidth: 1,
//       borderRadius: 30,
//       borderColor: '#dadae8',
//     },
//     errorTextStyle: {
//       color: 'red',
//       textAlign: 'center',
//       fontSize: 14,
//     },
//     successTextStyle: {
//       color: 'white',
//       textAlign: 'center',
//       fontSize: 18,
//       padding: 30,
//     },
//   });

import React, { Component, useState, useEffect, createRef } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

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

  const handleSubmitButton = ({navigation}) => {
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

  // if(isRegistrationSuccess){
  //     return(
  //         <View
  //             style={{
  //                 flex: 1,
  //                 backgroundColor: '#307ecc',
  //                 justifyContent: 'center',
  //             }}>
  //                 <Image
  //                     source={require('../Image/logo.png')}
  //                     style={{
  //                         height: 150,
  //                         resizeMode: 'contain',
  //                         alignSelf: 'center'}}/>
  //                 <Text style={styles.successTextStyle}>Registration Successful</Text>
  //                 <TouchableOpacity
  //                     style={styles.buttonStyle}
  //                     activeOpacity={0.5}
  //                     onPress={() => props.navigation.navigate('LoginScreen')}>
  //                         <Text style={styles.buttonTextSTyle}>Login Now</Text>
  //                 </TouchableOpacity>
  //         </View>
  //     );
  // }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image
          source={require("../Image/logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.registration}>REGISTRATION</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(FirstName) => setFirstname(FirstName)}
          textBreakStrategy="simple"
          style={styles.firstName}/>
        <TextInput
          placeholder="Last Name"
          onChangeText={(LastName) => setLastname(LastName)}
          textBreakStrategy="simple"
          style={styles.lastname}/>
        <TextInput
          placeholder="Phone Number"
          onChangeText={(PhoneNumber) => setPhonenum(PhoneNumber)}
          textBreakStrategy="simple"
          style={styles.phoneNum}/>
        <TextInput
          placeholder="Address"
          onChangeText={(Address) => setUserAddress(Address)}
          textBreakStrategy="simple"
          style={styles.address}/>
        <TextInput
          placeholder="Username"
          onChangeText={(Username) => setUsername(Username)}
          textBreakStrategy="simple"
          style={styles.username}/>
        <TextInput
          placeholder="Password"
          onChangeText={(Password) => setUserPassword(Password)}
          textBreakStrategy="simple"
          secureTextEntry={true}
          style={styles.password}/>
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(Comfirm) => setComfirm(Comfirm)}
          textBreakStrategy="simple"
          secureTextEntry={true}
          style={styles.confirmPass}/>
        <TouchableOpacity
          style={styles.button} onPress={handleSubmitButton}>
          <Text style={styles.login4}>REGISTER</Text>
        </TouchableOpacity>
        <View style={styles.labelContainer}>
          <Text style={styles.haveAnAccount}>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    backgroundColor: "white",
    width: 360,
    height: 717
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: 'center'
  },
  registration: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    letterSpacing: 5,
    marginTop: 10,
    alignSelf: 'center'
  },
  firstName: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  lastname: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  phoneNum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  address: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  username: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  password: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  confirmPass:{
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    alignSelf: 'center',
    marginTop: 20
  },
  button: {
    width: 300,
    height: 43,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.17,
    shadowRadius: 0,
    backgroundColor: "#e48f24",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
    alignSelf: 'center'
  },
  login4: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 13,
    alignSelf: 'center'
  },
  haveAnAccount: {
    marginRight: 5
  },
  labelContainer: {
    flex: 1, 
    flexDirection: 'row',
    marginHorizontal: 35,
    marginTop: 20,
    marginBottom: 20
  },
  loginLabel: {
    fontWeight: 'bold'
  }
});

export default RegisterScreen;
