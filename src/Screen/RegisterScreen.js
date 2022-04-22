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
//     const [username, setUsername] = useState('');
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [phonenum, setPhonenum] = useState('');
//     const [userAge, setUserAge] = useState('');
//     const [userAddress, setUserAddress] = useState('');
//     const [userPassword, setUserPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [errorText, setErrorText] = useState('');
//     const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

//     const emailInputRef = createRef();
//     const ageInputRef = createRef();
//     const addressInputRef = createRef();
//     const passwordInputRef = createRef();

//     const handleSubmitButton = () => {
//         setErrorText('');
//         // if(!username){
//         //     alert('Please Fill Username');
//         //     return;
//         // }
//         // if (!userEmail) {
//         //     alert('Please fill Email');
//         //     return;
//         //   }
//         //   if (!userAge) {
//         //     alert('Please fill Age');
//         //     return;
//         //   }
//         //   if (!userAddress) {
//         //     alert('Please fill Address');
//         //     return;
//         //   }
//         //   if (!userPassword) {
//         //     alert('Please fill Password');
//         //     return;
//         //   }

//           setLoading(true);
//           fetch('http://192.168.0.173:3000/api/user/registration', {
//               method: 'POST',
//               headers: {
//                 //Header Defination
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 // 'Content-Type':
//                 // 'application/x-www-form-urlencoded;charset=UTF-8',
//               },
//               body: JSON.stringify({
//                 firstname: firstname,
//                 lastname: lastname,
//                 phonenum: phonenum,
//                 address: userAddress,
//                 username: username,
//                 password: userPassword,
//               }),
//           })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 setLoading(false);
//                 console.log(responseJson);
//                 setIsRegistrationSuccess(true);
//                 console.log('Registration Success. Please Login to proceed');
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 console.error(error);
//             });
//     };

//     if(isRegistrationSuccess){
//         return(
//             <View
//                 style={{
//                     flex: 1,
//                     backgroundColor: '#307ecc',
//                     justifyContent: 'center',
//                 }}>
//                     <Image
//                         source={require('../Image/logo.png')}
//                         style={{
//                             height: 150,
//                             resizeMode: 'contain',
//                             alignSelf: 'center'}}/>
//                     <Text style={styles.successTextStyle}>Registration Successful</Text>
//                     <TouchableOpacity
//                         style={styles.buttonStyle}
//                         activeOpacity={0.5}
//                         onPress={() => props.navigation.navigate('LoginScreen')}>
//                             <Text style={styles.buttonTextSTyle}>Login Now</Text>
//                     </TouchableOpacity>
//             </View>
//         );
//     }

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


import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  SafeAreaView
} from "react-native";
import { Center } from "@builderx/utils";

function RegisterScreen(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.button2}></TouchableOpacity>
        <Image
            source={require("../Image/logo.png")}
            resizeMode="contain"
            style={styles.image1}
        ></Image>
        <Center horizontal>
            <Text style={styles.registration}>REGISTRATION</Text>
        </Center>
        <TextInput
            placeholder="First Name"
            style={styles.username1}
        ></TextInput>
        <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
            style={styles.button1}
        ></TouchableOpacity>
        <Text style={styles.register}>REGISTER</Text>
        <Text style={styles.newHere1}>New Here?</Text>
        <Text style={styles.register1}>Login</Text>
        <TextInput
            placeholder="Last Name"
            style={styles.username2}
        ></TextInput>
        <TextInput
            placeholder="Phone Number"
            style={styles.username3}
        ></TextInput>
        <TextInput
            placeholder="Address"
            style={styles.username4}
        ></TextInput>
        <TextInput
            placeholder="Username"
            style={styles.username5}
        ></TextInput>
        <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.username6}
        ></TextInput>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button2: {
    top: "85.42%",
    left: "33.33%",
    width: "20.22%",
    height: "2.43%",
    position: "absolute"
  },
  image1: {
    top: "2.16%",
    width: 100,
    height: 100,
    position: "absolute",
    alignSelf: 'center'
  },
  registration: {
    top: "19.86%",
    position: "absolute",
    fontFamily: "roboto-500",
    color: "#121212",
    fontSize: 22,
    letterSpacing: 5
  },
  username1: {
    top: "27.89%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.76%"
  },
  button1: {
    top: "84.74%",
    width: "83.33%",
    height: "6.49%",
    position: "absolute",
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
    alignSelf: 'center'
  },
  register: {
    top: "85.99%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    left: 149
  },
  newHere1: {
    top: "93.66%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    left: "8.61%"
  },
  register1: {
    top: "93.66%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    left: "31.39%"
  },
  username2: {
    top: "36.55%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.61%"
  },
  username3: {
    top: "45.33%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.76%"
  },
  username4: {
    top: "54.52%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.61%"
  },
  username5: {
    top: "63.97%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.61%"
  },
  username6: {
    top: "73.3%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "6.35%",
    width: "82.77%",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    fontSize: 16,
    left: "8.61%"
  }
});

export default RegisterScreen;
