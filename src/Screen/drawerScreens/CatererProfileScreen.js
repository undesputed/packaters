import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation, route}) => {
    const [caterer, setCaterer] = useState([]);
    const [comment, setComment] = useState([]);
    const [totalComm, setTotalComm] = useState('');
    const [totalServe, setTotalServe] = useState('');
    const [modalVisible, setModalVisible] =useState(false);
    const [textComment, setTextComment] = useState('');
    const [customerId, setCustomerId] = useState();
    const [customerFname, setCustomerFname] = useState('');
    const [customerLname, setCustomerLname] = useState('');
    
  const retrieveData = async () => {
    try {
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
          setCustomerId(responseJson[0].id);
          setCustomerFname(responseJson[0].cust_name);
          setCustomerLname(responseJson[0].cust_lastname);
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllData = () => {
    fetch('http://192.168.0.173:3000/api/retrieve/caterer',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: route.params.caterer_id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setCaterer(responseJson);
            })
            .catch((error) => console.log(error))

        //fetch comments
        fetch('http://192.168.0.173:3000/api/retrieve/comment',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params.caterer_id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setComment(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
        
        //fetch total comments
        fetch('http://192.168.0.173:3000/api/retrieve/totalComment', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params.caterer_id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson[0].total);
                setTotalComm(responseJson[0].total);
            })
            .catch((error) => {
                console.log(error);
            })

        //fetch total services
        fetch('http://192.168.0.173:3000/api/retrieve/totalServices', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params.caterer_id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson[0].totalService);
                setTotalServe(responseJson[0].totalService);
            })
            .catch((error) => {
                console.log(error);
            })
  }

    useEffect(() => {
        retrieveData();
        fetchAllData();
    },[])


    const onSubmitComment = () => {
        fetch('http://192.168.0.173:3000/api/create/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                comment: textComment,
                pack_customer_name: customerFname,
                pack_customer_lname: customerLname,
                pack_caterer_id: route.params.caterer_id,
                pack_customer_id: customerId,
            })
        }).then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              setModalVisible(!modalVisible);
              fetchAllData();
              alert('Comment added');
          })
          .catch((error) => {
              console.log(error);
          })
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
            data={caterer}
            extraData={caterer}
            ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator}/>
            )
            }}
            keyExtractor={(item)=>{
                return item.id;
            }}
            renderItem={(item) => {
                const Notification = item.item;
            return(
                <ScrollView
                  style={styles.container}
                  contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                  showsVerticalScrollIndicator={false}>
                    <Image
                    style={styles.userImg}
                    source={{uri: Notification.path_image}}
                    />
                    <Text style={styles.userName}>{Notification.cat_name}</Text>
                    <Text style={styles.aboutUser}>
                        {Notification.cat_details}
                    </Text>
                    <View style={styles.userBtnWrapper}>
                        <TouchableOpacity style={styles.userBtn} onPress={() => {setModalVisible(true)}}>
                        <Text style={styles.userBtnTxt}>Comment</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnTxt}>Rate</Text>
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{totalServe}</Text>
                        <Text style={styles.userInfoSubTitle}>Services</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{totalComm}</Text>
                        <Text style={styles.userInfoSubTitle}>Comments</Text>
                    </View>
                    {/* <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>100</Text>
                        <Text style={styles.userInfoSubTitle}>Ratings</Text>
                    </View> */}
                    </View>
                </ScrollView>
            );
            }}/>
        <View style={styles.commentsContainer}>
            <View style={styles.commentsSection}>
            <FlatList
                style={styles.root}
                data={comment}
                extraData={comment}
                ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator}/>
                )
                }}
                keyExtractor={(item)=>{
                return item.id;
                }}
                renderItem={(item) => {
                const Notification = item.item;
                return(
                    <View style={styles.comments}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image style={styles.image} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar7.png'}}/>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                            <Text  style={styles.name}>{Notification.pack_customer_name} {Notification.pack_customer_lname}</Text>
                            <Text style={styles.time}>
                                9:58 am
                            </Text>
                            </View>
                            <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
                        </View>
                    </View>
                );
                }}/>
            </View>
        </View>

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-comment-social-media-basic-1-sbts2018-flat-sbts2018.png'}}/>
                    <TextInput style={styles.inputs}
                        placeholder="Add Comment"
                        onChangeText={(email) => setTextComment(email)}/>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onSubmitComment}
                        >
                        <Text style={styles.textStyle}>Comment</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
            </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    height: '65%'
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  commentsContainer: {
    height: '35%'
  },
  separator: {
      height: 1,
      backgroundColor: '#CCCCCC'
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  comments: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#cecece',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
    },
});