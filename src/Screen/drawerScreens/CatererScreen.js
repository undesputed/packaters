import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    ToastAndroid,
    RefreshControl
} from 'react-native';

const CatererScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCaterer = () => {
      setRefreshing(false);
      fetch('http://192.168.0.173:3000/api/retrieve/caterer')
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              setData(responseJson);
          })
          .catch((error) => {
              console.log(error);
          })
    }

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      fetchCaterer();
      ToastAndroid.show('Updated', ToastAndroid.SHORT);
    }, [refreshing])

    useEffect(() => {
      fetchCaterer();
    },[])

    const onClickProfile = (id) => {
        navigation.navigate('CatererProfileScreen', {caterer_id: id})
    }

    return(
        <View style={styles.container}>
            <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={data}
            horizontal={false}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            keyExtractor= {(item) => {
                return item.id;
            }}
            renderItem={({item}) => {
                return (
                <TouchableOpacity style={styles.card} onPress={() => onClickProfile(item.id)}>
                    <View style={styles.cardHeader}>
                    <Image style={styles.icon} source={{uri:"https://img.icons8.com/flat_round/64/000000/hearts.png"}}/>
                    </View>
                    <Image style={styles.userImage} source={{uri:item.path_image}}/>
                    <View style={styles.cardFooter}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.name}>{item.cat_name}</Text>
                        <Text style={styles.position}>{item.cat_contactno}</Text>
                        <TouchableOpacity style={styles.followButton} onPress={() => onClickProfile(item.id)}>
                        <Text style={styles.followButtonText}>Profile</Text>  
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableOpacity>
                )
            }}/>
        </View>
    )
}

export default CatererScreen;


const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    list: {
      paddingHorizontal: 5,
      backgroundColor:"#E6E6E6",
    },
    listContainer:{
     alignItems:'center'
    },
    /******** card **************/
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginVertical: 5,
      backgroundColor:"white",
      flexBasis: '46%',
      marginHorizontal: 5,
    },
    cardFooter: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    userImage:{
      height: 120,
      width: 120,
      borderRadius:60,
      alignSelf:'center',
      borderColor:"#DCDCDC",
      borderWidth:3,
    },
    name:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#008080",
      fontWeight:'bold'
    },
    position:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#696969"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
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
    icon:{
      height: 20,
      width: 20, 
    }
  });    