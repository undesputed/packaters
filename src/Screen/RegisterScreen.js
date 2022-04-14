import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loader from './Component/loader';

const RegisterScreen = (props) => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phonenum, setPhonenum] = useState('');
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
        // if(!username){
        //     alert('Please Fill Username');
        //     return;
        // }
        // if (!userEmail) {
        //     alert('Please fill Email');
        //     return;
        //   }
        //   if (!userAge) {
        //     alert('Please fill Age');
        //     return;
        //   }
        //   if (!userAddress) {
        //     alert('Please fill Address');
        //     return;
        //   }
        //   if (!userPassword) {
        //     alert('Please fill Password');
        //     return;
        //   }

          setLoading(true);
          fetch('http://192.168.1.5:3000/api/user/registration', {
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
                setIsRegistrationSuccess(true);
                console.log('Registration Success. Please Login to proceed');
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    if(isRegistrationSuccess){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                    <Image
                        source={require('../Image/logo.png')}
                        style={{
                            height: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center'}}/>
                    <Text style={styles.successTextStyle}>Registration Successful</Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('LoginScreen')}>
                            <Text style={styles.buttonTextSTyle}>Login Now</Text>
                    </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={{flex: 1, backgroundColor: '#307ecc'}}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={require('../Image/logo.png')}
                            style={{
                                width: '50%',
                                height: 100,
                                resizeMode: 'contain',
                                margin: 30
                            }}
                        />
                    </View>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(FirstName) => setFirstname(FirstName)}
                                underlineColorAndroid="#f000"
                                placeholder='Enter FirstName'
                                placeholderTextColor= '#8b9cb5'
                                returnKeyType='next'
                                autoCapitalize='sentences'
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(LastName) => setLastname(LastName)}
                                underlineColorAndroid="#f000"
                                placeholder='Enter FirstName'
                                placeholderTextColor= '#8b9cb5'
                                autoCapitalize='sentences'
                                returnKeyType='next'
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserName) => setUsername(UserName)}
                                underlineColorAndroid="#f000"
                                placeholder='Enter Username'
                                placeholderTextColor= '#8b9cb5'
                                autoCapitalize='sentences'
                                returnKeyType='next'
                                onSubmitEditing={() => emailInputRef && emailInputRef.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={(PhoneNum) => setPhonenum(PhoneNum)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Phone Number"
                            placeholderTextColor="#8b9cb5"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAddress) =>
                                setUserAddress(UserAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            />
                        </View>
                        {errorText != '' ? (
                            <Text style={styles.errorTextStyle}>
                            {errorText}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitButton}>
                            <Text style={styles.buttonTextStyle}>REGISTER</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
  });