import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Voximplant } from 'react-native-voximplant';
import { APP_NAME, ACC_NAME } from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

const LoginScreen = ({ navigation }) => {

    // userCredentials
    const [userCredentials, setUserCredentials] = useState({ username: '', password: '' })
    const { username, password } = { ...userCredentials }

    // Alerts State
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({ title: "", message: "", confirmText: "" });
    const [error, setError] = useState('');

    // User Authinticated State
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // voxinplant Instance
    const voximplant = Voximplant.getInstance();

    // loginHandle
    const login = async () => {
        setAlertText({ title: "", message: "", confirmText: "" })
        setShowAlert(true)
        try {
            const status = await voximplant.getClientState();
            if (status === Voximplant.ClientState.DISCONNECTED) {
                await voximplant.connect();
            }
            console.log("Connected")

            const loginData = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(loginData, password);
            await AsyncStorage.setItem('loginCredentials', JSON.stringify(userCredentials))
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Home'
                }]
            })
        }
        catch (error) {
            console.log(error)
            if (error.name === 'AuthResult' && error.code === 401 || error.code === 404) {
                setError("login credential did't match")
                setShowAlert(false)
            }
            else if (error.name === 'AuthResult' && error.code === 491) {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Home'
                    }]
                })
            }
            else {
                setAlertText({ title: "Connection Failed", message: "Check your internet connection", confirmText: "OK" })
                setShowAlert(true)
            }

        }
    };

    useEffect(() => {
        const isLoggined = async () => {
            const loginCredentials = await AsyncStorage.getItem('loginCredentials')
            if (loginCredentials === null) {
                setIsAuthenticated(false)
            }
            else {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Home'
                    }]
                })
            }
        }
        isLoggined();
    }, [])

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
                            showProgress={alertText.title === 'Connection Failed' ? false : true}
                            title={alertText.title}
                            message={alertText.message}
                            showConfirmButton={alertText.confirmText.length ? true : false}
                            confirmText="OK"
                            confirmButtonColor="#DD6B55"
                            onConfirmPressed={() => setShowAlert(false)}
                        />
                    </View>
                    :
                    (<></>)
            }
            {
                !isAuthenticated ?
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.container}>
                                <View>
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

                                    {
                                        error.length ?
                                            <Text style={{
                                                fontSize: 15,
                                                paddingHorizontal: 20,
                                                paddingBottom: 10,
                                                color: 'red'
                                            }}>
                                                {error}
                                            </Text>
                                            :
                                            (<></>)
                                    }

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={{ color: '#ffffff', fontSize: 15 }}>
                                            Forgot Password?
                                        </Text>
                                        <Text style={{ color: '#2fe073', marginLeft: 5, fontSize: 15 }}>
                                            Recover here
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.Button} onPress={login}>
                                        <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 20 }}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.font}>Don't have an account?</Text>
                            <Text style={{ ...styles.font, color: '#2fe073', marginStart: 7 }} onPress={() => navigation.navigate('Register')}>SignUp here</Text>
                        </View>
                    </KeyboardAvoidingView>
                    :
                    (<></>)
            }
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

export default LoginScreen;