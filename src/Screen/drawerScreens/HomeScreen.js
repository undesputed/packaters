import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Product} from '../Component/product';
import {getProducts} from '../../../services/ProductsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const renderProduct = ({item: product}) => {
    return(
      <Product {...product}/>
    )
  }

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    // let get = AsyncStorage.getItem('user_id');
    // if(get !== null){
    //   navigation.replace('DrawerNavigationRoutes');
    // }else{
    //   navigation.replace('Auth');
    // }

    // fetch('http://192.168.1.101:3000/api/retrieve/services')
    //     .then(response => response.json())
    //     .then((responseJson) => {
    //       console.log(responseJson);
    //       setServices(responseJson);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={products}
        renderItem={renderProduct}
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
});
