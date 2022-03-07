import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallAction = ({ onHangupCall, onCameraSwitch, onSendAudio }) => {

    const [cameraType, setCameraType] = useState('front');

    const [sendAudio, setSendAudio] = useState(true);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={() => {
                onCameraSwitch(cameraType === 'front' ? 'back' : 'front')
                setCameraType(cameraType === 'front' ? 'back' : 'front')
            }}>
                <Ionicons
                    name="ios-camera-reverse"
                    size={30}
                    color="white"
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => {
                onSendAudio(sendAudio ? false : true)
                setSendAudio(sendAudio ? false : true)
            }}>
                <MaterialIcons
                    name={sendAudio ? 'microphone' : 'microphone-off'}  // Working Opposite as per Condtion?😅😅
                    size={30}
                    color="white"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={onHangupCall} style={{ ...styles.iconButton, backgroundColor: '#e3392d' }}>
                <MaterialIcons
                    name="phone-hangup"
                    size={30}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 999
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 15,
        borderRadius: 50,
    },
});

export default CallAction;