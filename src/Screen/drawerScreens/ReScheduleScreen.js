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
  Button,
  FlatList,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCard5 from "../../components/MaterialCard5";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const ReScheduleScreen = ({route, navigation}) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [dateButtonTitle, setDateButtonTitle] = useState('Set the Date');
  const [timeButtonTitle, setTimeButtonTitle] = useState('Set the Time');
  const [address, setAddress] = useState('');

  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let tempDate = new Date(date);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    setDateButtonTitle(fDate);
    setDate(fDate);
    hideDatePicker();
  };

  const showTimePIcker = () => {
    setTimePickerVisibility(true);
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  }

  const handleTimeConfirm = (time) => {
    
    var actiondate = new Date(time);
    var hours = actiondate.getHours();
    var minutes = actiondate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var currTime = hours + ':' + minutes + ' ' + ampm;
    setTime(time);
    setTimeButtonTitle(currTime);
    hideTimePicker();
  }

  const onClickPlaceOrder = () => {

    let tempDate = new Date(date);
    let tempTime = new Date(time);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    let fTime = tempTime.getHours()+":"+tempTime.getMinutes()+":"+tempTime.getSeconds();

    fetch('http://192.168.0.173:3000/api/update/transactions', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pack_date: date,
        pack_time: fTime,
        pack_address: address,
        id: route.params.transactionId
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Re-Schedule Success");
        navigation.navigate('TransactionHistoryScreen');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onClickCancel = () => {
    fetch('http://192.168.0.173:3000/api/update/transaction/status', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: route.params.transactionId
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Order Cancelled");
        navigation.navigate('TransactionHistoryScreen');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              placeholder='Address'
              onChangeText={(Address) => setAddress(Address)}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              autoCapitalize="none"
              style={styles.addressInput}
            />
            <View style={styles.dateButton}>
              <Button title={dateButtonTitle} onPress={showDatePicker} color="#e48f24"/>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode='date'
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                />
            </View>
            <View style={styles.timeButton}>
              <Button title={timeButtonTitle} onPress={showTimePIcker} color="#e48f24"/>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  locale='en_GB'
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelContainer} onPress={() => onClickCancel()}>
            <Text style={styles.placeOrder}>CANCEL ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.placeOrderContainer} onPress={() => onClickPlaceOrder()}>
            <Text style={styles.placeOrder}>RE-SCHEDULE</Text>
          </TouchableOpacity>
        </View>
            {/* <ScrollView>
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
            </ScrollView> */}
          </View>
    </SafeAreaView>
  );
};

export default ReScheduleScreen;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  formContainer:{
    backgroundColor: 'white',
    marginTop: "50%",
    width: '100%',
  },
  addressInput: {
    width: 330,
    alignSelf: 'center',
    height: 39,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "rgba(150, 150, 150, 1)",
  },
  dateButton: {
    width: 330,
    alignSelf: 'center',
    height: 39,
    color: 'white',
    backgroundColor: "#e48f24",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  timeButton: {
    width: 330,
    alignSelf: 'center',
    height: 39,
    color: 'white',
    backgroundColor: "#e48f24",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
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
  },
});