import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClickServices = (id) => {
    navigation.navigate('ServiceScreen', {service_id: id});
  }

  useEffect(() => {
    // let get = AsyncStorage.getItem('user_id');
    // if(get !== null){
    //   navigation.replace('DrawerNavigationRoutes');
    // }else{
    //   navigation.replace('Auth');
    // }

    fetch('http://192.168.0.101:3000/api/retrieve/services')
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setServices(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <TouchableOpacity style={styles.card} onPress={() => onClickServices(item.id)}>
            <Image
              style={styles.thumb}
              source={{uri:item.service_image}}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.service_name}</Text>
              <Text style={styles.caterer}>Caterer: {item.cat_name}</Text>
              <Text style={styles.price}>Price : $ {item.service_price}</Text>
            </View>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  caterer: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  }, 
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
