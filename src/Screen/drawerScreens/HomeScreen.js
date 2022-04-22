import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, FlatList, SafeAreaView } from "react-native";
import MaterialCard5 from "../../components/MaterialCard5";

const HomeScreen = ({navigation}) => {
  const [services, setServices] = useState([]);

  const onClickServices = (id) => {
    navigation.navigate('ServiceScreen', {service_id: id});
  }

  useEffect(() => {
    // let get = AsyncStorage.getItem('user_id');
    // if(get !== null){
    //   navigation.replace('DrawerNavigationRoutes');
    // }else{
    //   navigation.replace('Auth');
    // }

    fetch('http://192.168.0.173:3000/api/retrieve/services')
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setServices(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={services}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => onClickServices(item.id)}>
              <MaterialCard5 style={styles.materialCard5} item={item}></MaterialCard5>
            </TouchableOpacity>
        
          }
        />  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialCard5: {
    height: "59.86%",
    width: "89.44%",
    position: "absolute",
    top: "4.3%",
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    left: 19
  }
});

export default HomeScreen;
