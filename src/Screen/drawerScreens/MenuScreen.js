import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, RefreshControl, ToastAndroid, Modal, TouchableOpacity } from "react-native";
import {WebView} from "react-native-webview";

const MenuScreen = () =>{

    const [menu, setMenu] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchMenu = () => {
      setRefreshing(false);
      fetch('http://192.168.0.173:3000/api/retrieve/menu')
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              setMenu(responseJson);
          })
          .catch((error) => { console.log(error); })
    }

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      fetchMenu();
      ToastAndroid.show('Updated', ToastAndroid.SHORT);
    },[refreshing])

    useEffect(() => {
      fetchMenu();
    },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.followButton} onPress={() => setShowModal(true)}>
        <Text style={styles.followButtonText}>Create Your Own Menu</Text>  
      </TouchableOpacity>
        <FlatList
            data = {menu}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            renderItem={({item}) =>
                <View style={styles.rect}>
                    <Text style={styles.menuName}>{item.menu_name}</Text>
                    <Text style={styles.menuName1}>{item.menu_details}</Text>
                    <Text style={[item.status ? {color: 'red'} : {color : 'green'}, styles.status]}>{item.status ? 'Unavailable' : 'Available'}</Text>
                </View>
            }
        />
        <Modal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          animationType="slide"
          >
              <WebView source={{ uri: "http://localhost/packaters/index.php/CustomerController/login_menu"}}/>
          </Modal>
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
  },
  status: {
    fontFamily: 'roboto-700',
    letterSpacing: 2,
    marginLeft: 17,
    marginTop: 3
  },
  followButton: {
    marginTop:10,
    height:35,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: "#e48f24",
    alignSelf: 'center'
    
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
});

export default MenuScreen;
