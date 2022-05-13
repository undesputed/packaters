import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import {WebView} from 'react-native-webview';
import Icon from "react-native-vector-icons/FontAwesome";

const Payment = ({route, navigation}) => {
  
    const [showModal, setShowModal] = useState(false);
    const [payment, setPayment] = useState('');
    const [status, setStatus] = useState('Pending');

    const onClickCancel = () => {
        navigation.navigate('HomeScreen');
    }
    
    const onClickShowModal = (data) => {
        if(data.title === 'success'){
            setShowModal(false);
            setStatus('Completed');
            fetch('http://192.168.0.173:3000/api/create/transaction', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                package_name: route.params.package_name,
                pack_address: route.params.pack_address,
                pack_date: route.params.pack_date,
                pack_time: route.params.pack_time,
                pack_caterer_id: route.params.pack_caterer_id,
                customer_id: route.params.customer_id,
                customer_fname: route.params.customer_fname,
                customer_lname: route.params.customer_lname,
                package_id: route.params.package_id,
                price: route.params.price
              }),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                console.log(data.url);
                alert('Payment Successfully');
                navigation.navigate('HomeScreen');
              })
              .catch((error) => console.log(error));
        }else if(data.title === 'cancel'){
            setShowModal(false);
            setStatus('Canceled');
        }else{
            return;
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.rect2}>
            <Icon name="cc-paypal" style={styles.icon}></Icon>
          </View>
        </View>
        <View style={styles.rect3}>
          <View style={styles.rect4}>
            <Text style={styles.invoice}>INVOICE</Text>
          </View>
          <Text style={styles.loremIpsum}>Package Name</Text>
          <Text style={styles.packageIdNumber}>{route.params.package_name}</Text>
          <Text style={styles.schedDate}>Sched Date</Text>
          <Text style={styles.packageIdNumber1}>{route.params.pack_date}</Text>
          <View style={styles.catererNameRow}>
            <Text style={styles.catererName}>Caterer Name</Text>
            <Text style={styles.schedTime}>Sched Time</Text>
          </View>
          <View style={styles.harryHillsRow}>
            <Text style={styles.harryHills}>{route.params.caterer_name}</Text>
            <Text style={styles.packageIdNumber2}>{route.params.pack_time}</Text>
          </View>
          <Text style={styles.totalAmount}>Total Amount</Text>
          <Text style={styles.loremIpsum2}>₱{route.params.price}.00</Text>
        </View>
        <View style={styles.rect5}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={styles.payPal}>PayPal</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.rect6}>
            <TouchableOpacity onPress={() => onClickCancel()}>
                <Text style={styles.payPal1}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
    >
        <WebView source={{ uri: "http://192.168.0.173:3000/paypal"}}
            // onNavigationStateChange={() => onClickShowModal(data)}
            onNavigationStateChange={data => {
            // Keep track of going back navigation within component
            onClickShowModal(data)
            }}
            injectedJavaScript={`document.getElementById('price').value="`+route.params.price+`";document.f1.submit()`}
        />
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    width: Dimensions.get('window').width,
    height: 301,
    position: "absolute",
    alignSelf: 'center',
    backgroundColor: "rgba(201,217,233,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 7,
      width: 0
    },
    elevation: 5,
    shadowOpacity: 0.23,
    shadowRadius: 0
  },
  rect2: {
    width: 147,
    height: 102,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.35,
    shadowRadius: 0,
    marginTop: 103,
    alignSelf: 'center'
  },
  icon: {
    color: "rgba(16,155,214,1)",
    fontSize: 96,
    height: 96,
    width: 123,
    alignSelf: 'center'
  },
  rect3: {
    top: 265,
    width: '90%',
    height: 357,
    position: "absolute",
    backgroundColor: "rgba(228,142,37,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 5,
    shadowOpacity: 0.31,
    shadowRadius: 0,
    borderRadius: 8,
    alignSelf: 'center'
  },
  rect4: {
    width: 147,
    height: 35,
    backgroundColor: "#E6E6E6",
    borderRadius: 34,
    marginTop: 24,
    alignSelf: 'center'
  },
  invoice: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 7,
    alignSelf: 'center',
    fontWeight: '700'
  },
  rectStack: {
    width: 360,
    height: 622,
    marginLeft: -1
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(79,79,79,1)",
    marginTop: 20,
    alignSelf: 'center'
  },
  packageIdNumber: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    marginTop: 7,
    alignSelf: 'center'
  },
  schedDate: {
    fontFamily: "roboto-regular",
    color: "rgba(79,79,79,1)",
    marginTop: 11,
    alignSelf: 'center'
  },
  packageIdNumber1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    marginTop: 6,
    alignSelf: 'center'
  },
  catererName: {
    fontFamily: "roboto-regular",
    color: "rgba(79,79,79,1)",
    marginTop: 2
  },
  schedTime: {
    fontFamily: "roboto-regular",
    color: "rgba(79,79,79,1)",
    marginLeft: 103
  },
  catererNameRow: {
    height: 19,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 28,
    marginRight: 21
  },
  harryHills: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15
  },
  packageIdNumber2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    marginLeft: 119
  },
  harryHillsRow: {
    height: 18,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 28,
    marginRight: 40
  },
  totalAmount: {
    fontFamily: "roboto-regular",
    color: "rgba(79,79,79,1)",
    marginTop: 16,
    alignSelf: 'center'
  },
  loremIpsum2: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 5,
    alignSelf: 'center'
  },
  rect5: {
    top: 598,
    alignSelf: 'flex-end',
    width: '50%',
    height: 47,
    position: "absolute",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    backgroundColor: "rgba(23,155,215,1)",
    alignItems: 'center',
    justifyContent: 'center'
  },
  payPal: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 22,
    fontWeight: 'bold'
  },
  rect6: {
    top: 598,
    alignSelf: 'flex-start',
    width: '50%',
    height: 47,
    position: "absolute",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  payPal1: {
    fontFamily: "roboto-700",
    color: "gray",
    fontSize: 22,
    fontWeight: 'bold'
  },
  rectStack: {
    width: '100%',
    height: 645
  }
});

export default Payment;
