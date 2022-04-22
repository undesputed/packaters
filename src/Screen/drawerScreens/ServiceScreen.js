// Import React and Component
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Button} from 'react-native';

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
        console.log(responseJson);
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
          console.log(responseJson);
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
            <View style={styles.serviceContainer}>
              <Image
                style={styles.service_image}
                source={{uri:item.service_image}}
                />
              <View style={styles.infoCOntainer}>
                <Text style={styles.service_name}>{item.service_name}</Text>
                <Text style={styles.description}>{item.service_description}</Text>
                <Text style={styles.price}>₱{item.service_price}.00</Text>
              </View>
            </View>
              <View style={styles.catererContainer}>
                <Image
                  style={styles.cat_image}
                  source={{uri:item.cat_image}}
                  />
                <Text style={styles.caterer}>Your Caterer</Text>
                <Text style={styles.cat_name}>{item.cat_name}</Text>
                <Text style={styles.cat_address}>{item.cat_address}</Text>
                <Text style={styles.cat_contactno}>{item.cat_contactno}</Text>
                <Text style={styles.cat_details}>{item.cat_details}</Text>
              </View>
              <View style={styles.menuContainer}>
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
              </View>
          </View>
        }
      />
      <View styl={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelContainer} onPress={() => onClickCancel()}>
          <Text style={styles.placeOrder}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.placeOrderContainer} onPress={() => onClickPlaceOrder(serviceId)}>
          <Text style={styles.placeOrder}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  serviceContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  service_image: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    resizeMode: 'contain'
  },
  infoCOntainer:{
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  service_name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  description: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5
  },
  catererContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  caterer: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  cat_image:{
    width: '50%', 
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 100,
  },
  cat_name:{
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5
  },
  cat_address:{
    textAlign: 'center'
  },
  cat_contactno: {
    textAlign: 'center'
  },
  cat_details:{
    textAlign: 'center'
  },
  menuContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 3,
    elevation: 5
  },
  menuTitle: {
    fontSize: 25,
    fontWeight: '600'
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
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  cancelContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});