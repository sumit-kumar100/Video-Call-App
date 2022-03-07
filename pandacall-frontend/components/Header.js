import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Entypo
                    name="notification"
                    size={30}
                    color="#ffffff"
                />
            </TouchableOpacity>
            <Text style={styles.headingText}>
                PANDA CALL
            </Text>
            <TouchableOpacity>
                <Entypo
                    name="new-message"
                    size={30}
                    color="#ffffff"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    headingText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700'
    }
})
export default Header;