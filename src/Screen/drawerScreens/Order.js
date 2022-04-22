// Import React and Component
import React, {useState, useEffect} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  StatusBar, 
  TextInput, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  Button
} from 'react-native';
import {WebView} from 'react-native-webview'

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const OrderScreen = ({route, navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Pending');
  const [payment, setPayment] = useState([]);

  const onClickShowModal = (data) => {
    if(data.title === 'success'){
      setShowModal(false);
      setStatus('Completed');
      console.log(data);
    }else if(data.title === 'cancel'){
      setShowModal(false);
      setStatus('Canceled');
    }else{
        return;
    }
  }

  useEffect(() => {
    fetch('http://192.168.0.173:3000/api/retrieve/servicePrice', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: route.params.service_id
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].service_price);
        setPrice(responseJson[0].service_price);
      })
      .catch((error) => {
        console.log(error);
      })
  },[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
              <ScrollView>
                  <View style={{height: 5, width:Window.width}}/>
                  <View style={styles.titleContainer}>
                    <Text style={styles.yourParment}>Payment</Text>
                  </View>
                  <View style={{height: 5, width:Window.width}}/>
                    <View style={styles.paymentContainer}>
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
                                injectedJavaScript={`document.getElementById('price').value="`+price+`";document.f1.submit()`}
                            />
                        </Modal>
                        <TouchableOpacity
                            onPress={() => setShowModal(true)}
                        >
                        <Image
                            style={{height: 100, width: 250,padding: 10}}
                            source={require('../../Image/paypal.png')}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 5, width:Window.width}}/>
                    <View style={styles.paymentContainer}>
                        <TouchableOpacity>
                        <Image
                            style={{height: 100, width: 250,padding: 10}}
                            source={require('../../Image/cod.png')}
                        />
                        </TouchableOpacity>
                    </View>
              </ScrollView>
              <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <View style={{backgroundColor: '#69B1B3', flex: 1}}>
                        <View style={{widht: 350,flexDirection: 'row'}}>
                            <Text style={{paddingTop: 14, paddingLeft: 14, paddingBottom: 14, paddingRight: 5}}>Amount:</Text>
                            <Text style={{fontWeight: 'bold', paddingTop: 14, paddingBottom: 14}}>₱{price}</Text>
                        </View>
                    </View>
                <View style={{backgroundColor: 'pink', flex: 1}}>
                    <View style={{widht: 350,flexDirection: 'row'}}>
                        <Text style={{paddingTop: 14, paddingLeft: 14, paddingBottom: 14, paddingRight: 5}}>Status:</Text>
                        <Text style={{fontWeight: 'bold', paddingTop: 14, paddingBottom: 14}}>Select Payment</Text>
                    </View>
                </View>
              </View>
          </View>
    </SafeAreaView>
  );
};

export default OrderScreen;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ccc'
  },
  titleContainer: {
      elevation: 3,
      paddingBottom: 3,
      alignSelf: 'center',
      width: Window.width - 10,
      borderRadius: 3,
      backgroundColor: 'white'
  },
  yourParment:{
      padding: 10,
      fontSize: 18,
      fontWeight: 'bold'
  },
  paymentContainer: {
      elevation: 3,
      paddingBottom: 3,
      alignSelf: 'center',
      width: Window.width - 10,
      borderRadius: 3,
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row'
  }
  // paymentContainer:{
  //     elevation: 3,
  //     paddingBottom: 3,
  //     alignSelf: 'center',
  //     width: Window.Width - 10,
  //     borderRadius: 3,
  //     backgroundColor: 'white',
  //     flex:1 ,
  //     flexDirection: 'row'
  // },
});