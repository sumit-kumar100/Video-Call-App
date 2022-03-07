import React, { useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, BackHandler } from 'react-native';
import { API_URL } from '../Constants';
import axios from 'react-native-axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterScreen = ({ navigation }) => {
    // userCredentials
    const [userCredentials, setUserCredentials] = useState({ first_name: '', last_name: '', username: '', password: '' })
    const { first_name, last_name, username, password } = { ...userCredentials }

    // Alert State
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({ title: "", message: "", confirmText: "" });
    const [error, setError] = useState('');

    // Register User function
    const signup = async () => {
        setShowAlert(true)


        setTimeout(() => {
            setAlertText({ title: "Registration Failed", message: "Something went wrong !", confirmText: "OK" })
        }, 20000)

        axios.get(`${API_URL}AddUser/?first_name=${first_name}&last_name=${last_name}&username=${username}&password=${password}&notificationToken=${first_name + last_name}`)
            .then((response) => {
                if (response.data.result === 0) {
                    setShowAlert(false)
                    setError(response.data.error)
                }
                else {
                    setAlertText({ title: "PandaCall", message: "Registration Successfully", confirmText: "Continue to Login" })
                }
            })
            .catch((error) => {
                console.log(error)
                setAlertText({ title: "Registration Failed", message: "Something went wrong !", confirmText: "OK" })
            });
    }

    return (
        <ImageBackground
            source={require('../assets/login.jpg')}
            style={styles.backGround}
            resizeMode="cover"
            blurRadius={5}
        >
            {
                showAlert ?
                    <View style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={alertText.title === 'PandaCall' || alertText.title === 'Registration Failed' ? false : true}
                            title={alertText.title}
                            message={alertText.message}
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}
                            showCancelButton={false}
                            showConfirmButton={alertText.confirmText.length ? true : false}
                            cancelText=""
                            confirmText={alertText.confirmText}
                            confirmButtonColor="#DD6B55"
                            onCancelPressed={() => {
                                console.log("Cancel Button Pressed")
                            }}
                            onConfirmPressed={() => {
                                navigation.navigate("Login")
                            }}
                        />
                    </View>
                    :
                    (<></>)
            }
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setUserCredentials({ ...userCredentials, first_name: text })}
                                value={first_name}
                                placeholder='Enter firstname'
                                placeholderTextColor='#ffffff'
                                underlineColorAndroid="rgba(255,255,255,0)"
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setUserCredentials({ ...userCredentials, last_name: text })}
                                value={last_name}
                                placeholder='Enter lastname'
                                placeholderTextColor='#ffffff'
                                underlineColorAndroid="rgba(255,255,255,0)" />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setUserCredentials({ ...userCredentials, username: text })}
                                value={username}
                                placeholder='Enter username'
                                placeholderTextColor='#ffffff'
                                underlineColorAndroid="rgba(255,255,255,0)"
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setUserCredentials({ ...userCredentials, password: text })}
                                value={password}
                                placeholder='Enter password'
                                placeholderTextColor='#ffffff'
                                underlineColorAndroid="rgba(255,255,255,0)" />
                        </View>
                        {
                            error.length ?
                                <Text style={{
                                    fontSize: 15,
                                    paddingHorizontal: 20,
                                    paddingTop: 15,
                                    color: 'red'
                                }}>
                                    {error}
                                </Text>
                                :
                                (<></>)
                        }
                        <View>
                            <TouchableOpacity style={styles.Button} onPress={signup}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 20 }}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.font}>Already have an account?</Text>
                    <Text style={{ ...styles.font, color: '#2fe073', marginStart: 7 }} onPress={() => navigation.navigate('Login')}>Login here</Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#201F1F',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    textInput: {
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, .45)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 15,
        borderRadius: 10,
        color: '#ffffff'
    },
    Button: {
        color: '#ffffff',
        marginTop: 30,
        backgroundColor: '#2fe073',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    },
    font: {
        color: '#ffffff',
        fontSize: 15,
        paddingVertical: 20
    }
})

export default RegisterScreen;