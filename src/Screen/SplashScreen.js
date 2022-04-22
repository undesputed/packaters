import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image
} from 'react-native';

// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            // navigation.replace('DrawerNavigationRoutes');
            AsyncStorage.getItem('user_id').then((value) => 
            navigation.replace(
                    value === null ? 'Auth' : 'DrawerNavigationRoutes'
                ),
            );
        }, 5000);
    }, []);

    return(
        <View style={styles.container}>
            <Image
                source={require('../Image/logo.png')}
                style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
            <ActivityIndicator
                animating={animating}
                color="#ffffff"
                size="large"
                style={styles.ActivityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#656464',
    },
    ActivityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});