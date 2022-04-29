import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

const TransactionHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.173:3000/api/retrieve/transactions')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setHistory(responseJson);
            })
            .catch((error) => console.log(error));
    },[])
  return (
    <View style={styles.container}>
        <FlatList
            data = {history}
            keyExtractor={(item, index) =>  index.toString()}
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
    flex: 0.5,
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
    backgroundColor: "rgba(244, 244, 244,1)"
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
  }
});

export default TransactionHistory;
