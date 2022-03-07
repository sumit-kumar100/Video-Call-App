import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Voximplant } from 'react-native-voximplant';
import { Reminders, Buttons } from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const Incoming = ({ navigation, route }) => {

    const { call } = route.params;

    useEffect(() => {
        // Adding Disconnect Event on Incoming Component
        call.on(Voximplant.CallEvents.Disconnected, callevent => navigation.navigate('Home'));

        // unSubscribing or Cleaning Events 
        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        }
    }, [])

    const handleCallAction = (action) => {
        if (action === 'Accept') {
            navigation.navigate('Calling', {
                userCall: call,    // passing whole call reference i.e who is calling ? RemoteStreamID? etc.....
                isIncomingCall: true
            })
        }
        else if (action === 'Decline') {
            call.decline()
        }
        else {
            null
        }
    }

    return (
        <ImageBackground
            source={require('../assets/login.jpg')}
            style={styles.backGround}
            resizeMode="cover"
            blurRadius={5}
        >
            {/* Incoming Heading */}
            <Text style={styles.name}>Sumit</Text>
            <Text style={styles.phoneNumber}>WhatsApp video...</Text>

            {/* Reminders */}
            <View style={{ ...styles.row, marginTop: 'auto' }}>
                {
                    Reminders.map((item, index) => {
                        return (
                            <View style={styles.iconContainer} key={index}>
                                <Ionicons
                                    name={item.icon}
                                    color="white"
                                    size={30}
                                />
                                <Text style={styles.iconText}>{item.text}</Text>
                            </View>
                        )
                    })
                }
            </View>

            {/* Acception and Rejection  */}
            <View style={styles.row}>
                {
                    Buttons.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.iconContainer} key={index} onPress={() => handleCallAction(item.text)}>
                                <View style={{ ...styles.iconButtonContainer, backgroundColor: item.text === 'Accept' ? '#10ad54' : '#d42d17' }}>
                                    <Feather
                                        name={item.icon}
                                        color="white"
                                        size={40}
                                    />
                                </View>
                                <Text style={styles.iconText}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#201F1F',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingBottom: 50,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
        marginBottom: 10,
        fontFamily: 'monospace'
    },
    phoneNumber: {
        fontSize: 18,
        color: 'white',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    iconText: {
        color: 'white',
        marginTop: 10,
    },
    iconButtonContainer: {
        padding: 15,
        borderRadius: 50,
        margin: 10,
    },
});

export default Incoming;