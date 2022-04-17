// Import React and Component
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';

const ServiceScreen = ({route, navigation}) => {
  const [service, setService] = useState([]);
  const [menu, setMenu] = useState([]);
  const [serviceId, setServiceId] = useState();

  const onClickPlaceOrder = (id) => {
    navigation.navigate('OrderScreen', {service_id: id});
  }

  useEffect(() => {
    fetch('http://192.168.0.101:3000/api/retrieve/services',{
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
        console.log(responseJson);
        setServiceId(route.params.service_id);
        setService(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });

      fetch('http://192.168.0.101:3000/api/retrieve/menu',{
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
          console.log(responseJson);
          setMenu(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={service}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View style={styles.serviceContainer}>
            <Image
              style={styles.service_image}
              source={{uri:item.service_image}}
            />
            <View style={styles.infoCOntainer}>
              <Text style={styles.service_name}>{item.service_name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.service_price}</Text>
            </View>
            <View style={styles.catererContainer}>
              <Image
                style={styles.cat_image}
                source={{uri:item.cat_image}}
              />
              <Text style={styles.cat_name}>{item.cat_name}</Text>
              <Text style={styles.cat_address}>{item.cat_address}</Text>
              <Text style={styles.cat_contactno}>{item.cat_contactno}</Text>
              <Text style={styles.cat_details}>{item.cat_details}</Text>
            </View>
          </View>
        }
      />
      <Text style={styles.menuTitle}>Menu List</Text>
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text>{item.menu_name}</Text>
            <Text>{item.menu_details}</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.placeOrderContainer} onPress={() => onClickPlaceOrder(serviceId)}>
        <Text style={styles.placeOrder}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({

});