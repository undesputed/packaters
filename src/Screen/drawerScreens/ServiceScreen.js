// Import React and Component
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const ServiceScreen = ({route, navigation}) => {
  const [service, setService] = useState([]);

  useEffect(() => {
    alert(route.params.service_id);
    fetch('http://192.168.1.101:3000/api/retrieve/services',{
      method: 'POST',
      body: JSON.stringify({
        id: route.params.service_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setService[responseJson];
      })
      .catch((error) => {
        console.log(error);
      })
  },[])


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Example of Splash, Login and Sign Up in React Native
            {'\n\n'}
            This is the Settings Screen
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Splash, Login and Register Example{'\n'}React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;