// Import React and Component
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import MaterialCard5 from "../../components/MaterialCard5";
import MaterialCardWithImageAndTitle from "../../components/MaterialCardWithImageAndTitle";

const Separator = () => (
  <View style={styles.separator} />
);

const ServiceScreen = ({route, navigation}) => {
  const [service, setService] = useState([]);
  const [menu, setMenu] = useState([]);
  const [serviceId, setServiceId] = useState();

  const onClickPlaceOrder = (id) => {
    navigation.navigate('OrderScreen', {service_id: id});
  }

  const onClickCancel = () => {
    navigation.navigate('HomeScreen');
  }

  useEffect(() => {
    fetch('http://192.168.0.173:3000/api/retrieve/services',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: route.params.service_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        setServiceId(route.params.service_id);
        setService(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });

      fetch('http://192.168.0.173:3000/api/retrieve/menu',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: route.params.service_id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          setMenu(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={service}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View>
            <MaterialCard5 style={styles.materialCard5} item={item}></MaterialCard5>
            <MaterialCardWithImageAndTitle item={item}></MaterialCardWithImageAndTitle>
              <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>Menu List</Text>
                <FlatList
                  data = {menu}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =>
                      <View style={styles.rect}>
                          <Text style={styles.menuName}>{item.menu_name}</Text>
                          <Text style={styles.menuName1}>{item.menu_details}</Text>
                          <Text style={[item.status ? {color: 'red'} : {color : 'green'}, styles.status]}>{item.status ? 'Unavailable' : 'Available'}</Text>
                      </View>
                  }
              />
              </View>
          </View>
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelContainer} onPress={() => onClickCancel()}>
          <Text style={styles.placeOrder}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.placeOrderContainer} onPress={() => onClickPlaceOrder(serviceId)}>
          <Text style={styles.placeOrder}>PLACE ODER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 5,
    marginLeft: 17
  },
  status: {
    fontFamily: 'roboto-700',
    letterSpacing: 2,
    marginLeft: 17,
    marginTop: 3
  },
  menuTitle: {
    fontSize: 25,
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeOrderContainer: {
    elevation: 8,
    backgroundColor: "#422517",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    width: '50%',
    alignContent: 'center',
    fontWeight: "bold",
    alignItems: "center",
    color: '#fff',
  },
  cancelContainer: {
    elevation: 8,
    alignItems: 'center',
    backgroundColor: "#e48f24",
    paddingVertical: 10,
    width: '50%',
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  placeOrder: {
    color: 'white'
  }
});