import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

const MenuScreen = () =>{

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.173:3000/api/retrieve/menu')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setMenu(responseJson);
            })
            .catch((error) => { console.log(error); })
    },[])

  return (
    <View style={styles.container}>
        <FlatList
            data = {menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
                <View style={styles.rect}>
                    <Text style={styles.menuName}>{item.menu_name}</Text>
                    <Text style={styles.menuName1}>{item.menu_details}</Text>
                </View>
            }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 356,
    height: 133,
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    marginTop: 41,
    alignSelf: 'center'
  },
  menuName: {
    fontFamily: "roboto-700",
    color: "#121212",
    letterSpacing: 2,
    marginTop: 34,
    marginLeft: 17,
    fontWeight: 'bold',
    fontSize: 18
  },
  menuName1: {
    fontFamily: "roboto-italic",
    color: "#121212",
    marginTop: 9,
    marginLeft: 17
  }
});

export default MenuScreen;
