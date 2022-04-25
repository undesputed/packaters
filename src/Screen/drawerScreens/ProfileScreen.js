import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function ProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/149071.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={styles.rect}>
        <Text style={styles.carrieAYu}>Carrie A. Yu</Text>
        <Text style={styles.fatimaUbayBohol}>Fatima, Ubay, Bohol</Text>
        <Text style={styles.username}>username</Text>
        <Text style={styles.password}>Password</Text>
        <View style={styles.rect2}>
          <Text style={styles.updatePassword}>Update Password</Text>
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
  }
});

export default ProfileScreen;
