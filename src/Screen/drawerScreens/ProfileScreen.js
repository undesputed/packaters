import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  
  const [user, setUser] = useState([]);

  
  const retrieveData = async () => {
    try {
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
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  };

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
          renderItem={({item}) => 
            <View>
              <Text style={styles.carrieAYu}>Name: {item.cust_name} {item.cust_lastname}</Text>
              <Text style={styles.fatimaUbayBohol}>Address: {item.cust_address}</Text>
              <Text style={styles.username}>Username: {item.username}</Text>
              <Text style={styles.password}>Password: {item.password}</Text>
              {/* <View style={styles.rect2}> */}
                {/* <Text style={styles.updatePassword}>Update Password</Text> */}
              {/* </View> */}
            </View>
          }
        />
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
  }
});

export default ProfileScreen;
