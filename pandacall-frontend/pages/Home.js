import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, ImageBackground, TouchableOpacity, LogBox, View, ActivityIndicator } from 'react-native';
import { Voximplant } from 'react-native-voximplant';
import { APP_NAME, ACC_NAME, API_URL } from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import axios from 'react-native-axios';


const Home = ({ navigation, setLoginStatus }) => {

    // show Spinner while fetching data
    const [isDataFetched, setIsDataFetched] = useState(false);

    // Contact User List
    const [users, setUsers] = useState([]);

    // Voximplant Instace
    const voximplant = Voximplant.getInstance();

    // Warning which is to ignored
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state. Check:'])

    // Seach Text
    const [SearchQuery, setSearchQuery] = useState("")

    // Creating connection with Voximplant
    const InitialStage = async () => {
        const loginCredentials = await AsyncStorage.getItem('loginCredentials')
        if (loginCredentials !== null) {
            const loginCredentialsObject = JSON.parse(loginCredentials)
            try {
                const status = await voximplant.getClientState();
                if (status === Voximplant.ClientState.DISCONNECTED) {
                    await voximplant.connect();
                    console.log("CONNECTED")
                }
                const loginData = `${loginCredentialsObject.username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
                await voximplant.login(loginData, loginCredentialsObject.password)
                console.log("LOGGINED_SUCCESSFULLY")
            }
            catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(() => {
        InitialStage();

        axios.get(`${API_URL}GetUser/`)
            .then(async (response) => {
                const loginCredentials = await AsyncStorage.getItem('loginCredentials')
                const loginCredentialsObject = JSON.parse(loginCredentials)
                setIsDataFetched(true)
                setUsers(response.data.filter(item => item.username !== loginCredentialsObject.username))
            })
            .catch((error) => {
                console.log("COMING IN ERROR HOME PAGE AXIOS GETUSERS")
                console.log(error)
            })

        // Adding Incoming Event on Home Page
        voximplant.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent) => {
            navigation.navigate('Incoming', {
                call: incomingCallEvent.call
            })
        });

        // unSubscribing or Cleaning Events 
        return () => {
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
        }
    }, [])


    return (
        <ImageBackground
            source={require('../assets/login.jpg')}
            style={styles.backGround}
            resizeMode="cover"
            blurRadius={4}
        >
            <Header setLoginStatus={setLoginStatus} />
            <SearchBar
                users={users}
                navigation={navigation}
                SearchQuery={SearchQuery}
                setSearchQuery={setSearchQuery}
            />
            {
                !SearchQuery.length ?
                    <>
                        {
                            isDataFetched ?
                                <FlatList
                                    data={users}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('Calling', { user: item.username, token: item.notificationToken })}>
                                            <Text style={styles.contactName}>{item.first_name} {item.last_name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#2fe073" />
                                </View>
                        }
                    </>
                    :
                    (<></>)

            }
            <Footer />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#201F1F',
        flex: 1
    },
    contactName: {
        fontSize: 17,
        paddingVertical: 15,
        paddingHorizontal: 30,
        color: '#ffffff',
        fontStyle: 'italic'
    },
    searchInput: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
});

export default Home;
