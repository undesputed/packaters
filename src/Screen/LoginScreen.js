// import React, {useState, createRef} from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Keyboard,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import AsyncStorage from '@react-native-community/async-storage';

// import Loader from './Component/loader';

// const LoginScreen = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errortext, setErrortext] = useState('');

//   const passwordInputRef = createRef();

//   const handleSubmitPress = () => {
//     setErrortext('');
//     if (!username) {
//       alert('Please fill Email');
//       return;
//     }
//     if (!userPassword) {
//       alert('Please fill Password');
//       return;
//     }
//     setLoading(true);
//     let dataToSend = {username: username, password: userPassword};

//     fetch('http://192.168.0.173:3000/api/user/login', {
//       method: 'POST',
//       headers: {
//         //Header Defination
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'Content-Type':
//         // 'application/x-www-form-urlencoded;charset=UTF-8',
//       },
//       body: JSON.stringify({
//         username: username,
//         password: userPassword
//       }),
//     })
//       .then((response) => response.json())
//       .then((responseJson) => {
//         //Hide Loader
//         setLoading(false);

//         console.log(responseJson[0].id);

//         AsyncStorage.setItem('user_id', responseJson[0].username);

//         navigation.replace('DrawerNavigationRoutes');
//       })
//       .catch((error) => {
//         //Hide Loader
//         setLoading(false);
//         console.error(error);
//       });
//   };

//   return (
//     <View style={styles.mainBody}>
//       <Loader loading={loading} />
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: 'center',
//           alignContent: 'center',
//         }}>
//         <View>
//           <KeyboardAvoidingView enabled>
//             <View style={{alignItems: 'center'}}>
//               <Image
//                 source={require('../Image/logo.png')}
//                 style={{
//                   width: '100%',
//                   height: 200,
//                   resizeMode: 'contain',
//                   margin: 20,
//                 }}
//               />
//             </View>
//             <View style={styles.SectionStyle}>
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(Username) =>
//                   setUsername(Username)
//                 }
//                 placeholder="Enter Email" //dummy@abc.com
//                 placeholderTextColor="#8b9cb5"
//                 autoCapitalize="none"
//                 returnKeyType="next"
//                 onSubmitEditing={() =>
//                   passwordInputRef.current &&
//                   passwordInputRef.current.focus()
//                 }
//                 underlineColorAndroid="#f000"
//                 blurOnSubmit={false}
//               />
//             </View>
//             <View style={styles.SectionStyle}>
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(UserPassword) =>
//                   setUserPassword(UserPassword)
//                 }
//                 placeholder="Enter Password" //12345
//                 placeholderTextColor="#8b9cb5"
//                 keyboardType="default"
//                 ref={passwordInputRef}
//                 onSubmitEditing={Keyboard.dismiss}
//                 blurOnSubmit={false}
//                 secureTextEntry={true}
//                 underlineColorAndroid="#f000"
//                 returnKeyType="next"
//               />
//             </View>
//             {errortext != '' ? (
//               <Text style={styles.errorTextStyle}>
//                 {errortext}
//               </Text>
//             ) : null}
//             <TouchableOpacity
//               style={styles.buttonStyle}
//               activeOpacity={0.5}
//               onPress={handleSubmitPress}>
//               <Text style={styles.buttonTextStyle}>LOGIN</Text>
//             </TouchableOpacity>
//             <Text
//               style={styles.registerTextStyle}
//               onPress={() => navigation.navigate('RegisterScreen')}>
//               New Here ? Register
//             </Text>
//           </KeyboardAvoidingView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };
// export default LoginScreen;

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#656464',
//     alignContent: 'center',
//   },
//   SectionStyle: {
//     flexDirection: 'row',
//     height: 40,
//     marginTop: 20,
//     marginLeft: 35,
//     marginRight: 35,
//     margin: 10,
//   },
//   buttonStyle: {
//     backgroundColor: '#7DE24E',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#7DE24E',
//     height: 40,
//     alignItems: 'center',
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 20,
//     marginBottom: 25,
//   },
//   buttonTextStyle: {
//     color: '#FFFFFF',
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   inputStyle: {
//     flex: 1,
//     color: 'white',
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: '#dadae8',
//   },
//   registerTextStyle: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 14,
//     alignSelf: 'center',
//     padding: 10,
//   },
//   errorTextStyle: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

import React, { Component, useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
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
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ 
          flex: 1,
          justifyContent: 'center',
          contentContainerStyle: 'center'
         }}
      >
        <TouchableOpacity
          onPress={() => navigation.replace("RegisterScreen")}
          style={styles.button2}
        >
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
        <Image
          source={require("../Image/logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.loginForm}>LOGIN FORM</Text>
        <Text style={styles.newHere2}>New Here?</Text>
        <TextInput
          placeholder="Username"
          textBreakStrategy="simple"
          onChangeText={(Username) => setUsername(Username)}
          style={styles.username}
        ></TextInput>
        <TextInput
          placeholder="Password"
          textBreakStrategy="simple"
          autoFocus={false}
          secureTextEntry={true}
          onChangeText={(UsePassword) => setUserPassword(UsePassword)}
          blurOnSubmit={true}
          style={styles.username1}
        ></TextInput>
        <TouchableOpacity
          onPress={() => handleSubmitPress()}
          style={styles.button}
        ></TouchableOpacity>
        <Text style={styles.login4}>LOGIN</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  register: {
    top: "61.85%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 15,
    left: "40%",
    fontWeight: 'bold'
  },
  button2: {
    top: 457,
    left: 167,
    width: 71,
    height: 32,
    position: "absolute"
  },
  image: {
    top: "8.65%",
    width: 100,
    height: 100,
    position: "absolute",
    left: "36.11%"
  },
  loginForm: {
    top: "28.77%",
    position: "absolute",
    fontFamily: "roboto-500",
    color: "#e48f24",
    fontSize: 22,
    letterSpacing: 5,
    left: "25.14%"
  },
  newHere2: {
    top: "72.85%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    left: "30%"
  },
  username: {
    top: "41.68%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 264,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    left: "15%"
  },
  username1: {
    top: "51.55%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 264,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,1)",
    borderRadius: 9,
    borderStyle: "solid",
    left: "15%"
  },
  button: {
    top: "62.17%",
    width: 264,
    height: 43,
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
    left: "15%"
  },
  login4: {
    top: "63.93%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    alignSelf: 'center'
  }
});

export default LoginScreen;
