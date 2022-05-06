import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, ToastAndroid, RefreshControl, Modal, ScrollView, Pressable, TextInput, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = ({navigation}) => {
  
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [confirm, setComfirm] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [id, setId] = useState();
  
  const retrieveData = async () => {
    try {
      setRefreshing(false);
      const valueString = await AsyncStorage.getItem('user_id');
      const value = valueString;
      fetch('http://192.168.0.173:3000/api/user/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setUser(responseJson);
          console.log(responseJson[0].id);
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitButton = () => {
    setModalVisible(!modalVisible);

    if(firstname, lastname, phonenum, userAddress, username, userPassword){
      fetch('http://192.168.0.173:3000/api/update/customer', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type':
            // 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: JSON.stringify({
            id: id,
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
    }else{
      alert('Fields must not be empty!!');
    }
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    retrieveData();
    ToastAndroid.show('Updated', ToastAndroid.SHORT);
  }, [refreshing])

  useEffect( () => {
    retrieveData();
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/149071.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={styles.rect}>
        <FlatList
          data={user}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
          renderItem={({item}) => 
            <View>
              <Text style={styles.carrieAYu}>Name: {item.cust_name} {item.cust_lastname}</Text>
              <Text style={styles.fatimaUbayBohol}>Address: {item.cust_address}</Text>
              <Text style={styles.username}>Username: {item.username}</Text>
              <Text style={styles.password}>Password: {item.password}</Text>
              <TouchableOpacity style={styles.rect2} onPress={() => setModalVisible(true)}>
                <Text style={styles.updatePassword}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          }
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <ScrollView style={styles.scrollView}>
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
              </ScrollView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleSubmitButton}
                >
                  <Text style={styles.textStyle}>Update Profile</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  rect: {
    width: 356,
    height: 246,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.19,
    shadowRadius: 0,
    marginTop: 9,
    alignSelf: 'center'
  },
  carrieAYu: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 32,
    alignSelf: 'center'
  },
  fatimaUbayBohol: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 9,
    alignSelf: 'center'
  },
  username: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 11,
    alignSelf: 'center'
  },
  password: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 10,
    alignSelf: 'center'
  },
  rect2: {
    width: 166,
    height: 37,
    backgroundColor: "rgba(228,143,36,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    marginTop: 18,
    alignSelf: 'center'
  },
  updatePassword: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 6,
    alignSelf: "center"
  },
  scrollView: {
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    width: Dimensions.get('window').width - 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 150
  },
  buttonClose: {
    backgroundColor: "rgba(228,143,36,1)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
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
});

export default ProfileScreen;
