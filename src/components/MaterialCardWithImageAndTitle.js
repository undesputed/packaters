import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const MaterialCardWithImageAndTitle = ({item}) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.yourCaterer}>Your Caterer</Text>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>{item.cat_name}</Text>
          <Text style={styles.subtitleStyle}>{item.cat_address}</Text>
        </View>
        <Image
          source={{ uri: item.cat_image }}
          style={styles.cardItemImagePlace}
        ></Image>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.actionButton1}>
          <Text style={styles.actionText1}>{item.cat_details}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2}>
          <Text style={styles.actionText2}>{item.cat_contactno}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 221,
    width: 330,
    marginTop: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  yourCaterer:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center'
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1
  },
  titleStyle: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  subtitleStyle: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 80,
    width: 80,
    margin: 16
  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  },
  actionButton1: {
    padding: 8,
    height: 36
  },
  actionText1: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  },
  actionButton2: {
    padding: 8,
    height: 36
  },
  actionText2: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  }
});

export default MaterialCardWithImageAndTitle;
