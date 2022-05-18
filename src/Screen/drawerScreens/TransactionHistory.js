import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, ToastAndroid, RefreshControl, TouchableOpacity } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionHistory = ({navigation}) => {
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
      retrieveData();
      fetchTransactions();
    },[])

    const retrieveData = async () => {
      try {
        setRefreshing(false);
        const valueString = await AsyncStorage.getItem('user_id');
        const value = valueString;
        fetch('http://192.168.0.173:3000/api/user/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: value
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson[0].id);
            setCustomerId(responseJson[0].id);
            fetchTransactions(responseJson[0].id);

          })
          .catch((error) => {
            console.log(error);
          })
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTransactions = (id) => {
      setRefreshing(false);
      fetch('http://192.168.0.173:3000/api/retrieve/transactions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id
          }),
      })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              setHistory(responseJson);
          })
          .catch((error) => console.log(error));
    }

    const reSchedButton = (status) => {
      if(status === "Completed") {
        return (
          <View></View>
        )
      }else {
        return (
          <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('ReScheduleScreen', {transactionId : item.trans_id})}>
            <Text style={styles.followButtonText}>Re-Schedule</Text>  
          </TouchableOpacity>
        )
      }
    } 

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      retrieveData();
      // fetchTransactions(false);
      ToastAndroid.show('Updated', ToastAndroid.SHORT);
    }, [refreshing])

    
  return (
    <View style={styles.container}>
        <FlatList
            data = {history}
            keyExtractor={(item, index) =>  index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            renderItem={({item}) => 
                <View style={styles.rect}>
                    <View style={styles.rect2}></View>
                    <View style={styles.ellipseStack}>
                    <Svg viewBox="0 0 80 82" style={styles.ellipse}>
                        <Ellipse
                        stroke="rgba(230, 230, 230,1)"
                        strokeWidth={0}
                        fill="rgba(255,255,255,1)"
                        cx={40}
                        cy={41}
                        rx={40}
                        ry={41}
                        ></Ellipse>
                    </Svg>
                    <Image
                        source={require("../../assets/images/149071.png")}
                        resizeMode="contain"
                        style={styles.image}
                    ></Image>
                    </View>
                    <Text style={styles.status}>{item.statuses}</Text>
                    <Text style={styles.price}>{item.service_price}</Text>
                    <View style={styles.rect3}></View>
                    <Text style={styles.serviceName}>{item.service_name}</Text>
                    <Text style={styles.customerName}>{item.customer_fname} {item.customer_lname}</Text>
                    <Text style={styles.dateAndTime}>{
                      new Date(item.pack_date).getFullYear() + '-' + (new Date(item.pack_date).getMonth() + 1) + '-' + new Date(item.pack_date).getDate()
                    }</Text>
                    <Text style={styles.address}>{item.pack_address}</Text>
                    <Text style={styles.caterer}>{item.cat_name}</Text>
                    {reSchedButton(item.statuses)}
                    {/* <View>
                        <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('ReScheduleScreen', {transactionId : item.trans_id})}>
                          <Text style={styles.followButtonText}>Re-Schedule</Text>  
                        </TouchableOpacity>
                    </View> */}
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
    width: 330,
    height: 241,
    backgroundColor: "#E6E6E6",
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.22,
    shadowRadius: 0,
    flexDirection: "row",
    marginTop: 27,
    alignSelf: "center"
  },
  rect2: {
    flex: 1,
    backgroundColor: "rgba(219, 219, 219,1)"
  },
  ellipse: {
    top: 3,
    left: 0,
    width: 80,
    height: 82,
    position: "absolute"
  },
  image: {
    top: 0,
    left: 4,
    width: 71,
    height: 88,
    position: "absolute"
  },
  ellipseStack: {
    top: 18,
    left: 43,
    width: 80,
    height: 88,
    position: "absolute"
  },
  status: {
    top: 119,
    left: 63,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#e48f24"
  },
  price: {
    top: 144,
    left: 67,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  rect3: {
    flex: 0.5,
    // backgroundColor: "rgba(244, 244, 244,1)"
  },
  serviceName: {
    top: 53,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    left: 173
  },
  customerName: {
    top: 86,
    left: 173,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  dateAndTime: {
    top: 136,
    left: 173,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  address: {
    top: 113,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    left: 173
  },
  caterer: {
    top: 161,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    left: 173
  },
  followButton: {
    marginTop:10,
    height:35,
    width:140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
    
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
});

export default TransactionHistory;
