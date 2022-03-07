import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = [
    {
        icon: 'md-call',
        text: 'call'
    },
    {
        icon: 'camera-outline',
        text: 'camera'
    },
    {
        icon: 'chatbox-ellipses-outline',
        text: 'chat'
    },
    {
        icon: 'md-settings-sharp',
        text: 'setting'
    }
]

const Footer = () => {
    return (
        <View style={styles.FooterContainerStyle}>
            {
                Icon.map((item, index) => {
                    return (
                        <TouchableOpacity style={{ alignItems: 'center' }} key={index}>
                            <Ionicons
                                name={item.icon}
                                size={25}
                                color='#ffffff'
                                styles={styles.FooterIconStyle}
                            />
                            <Text style={{color:'#ffffff'}}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    FooterContainerStyle: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        // backgroundColor: '#201F1F'
    },
    FooterIconStyle: {
        marginBottom: 3,
        color: '#ffffff'
    },
    headingText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700'
    }
})

export default Footer;