import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = ({ users, navigation, SearchQuery, setSearchQuery }) => {

    // Search Recommendataion
    const [ResultData, setResultData] = useState([])

    // Search Progress
    const [searchProgress, setSearchProgress] = useState(false);

    // handleonChangeText
    const handleOnChangeText = (text) => {
        setSearchProgress(true)
        setSearchQuery(text)
        if (SearchQuery.length !== 0) {
            users.map((item) => {
                if (item.user_name.toLowerCase().startsWith(SearchQuery.toLowerCase().slice(0, 4)) || item.user_display_name.toLowerCase().startsWith(SearchQuery.toLowerCase().slice(0, 4))) {
                    ResultData.length ?
                        ResultData.map((user) => {
                            !user.user_id === item.user_id ? setResultData([...ResultData, item]) : null
                        })
                        :
                        setResultData([...ResultData, item])
                }
            })
        }
        else {
            setResultData([])
        }
        setTimeout(() => {
            setSearchProgress(false);
        }, 2000)
    }

    // renderItem
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Calling', { user: item.user_name })}>
                <Text style={styles.contactName}>{item.user_display_name}</Text>
            </TouchableOpacity>
        )
    }



    return (
        <>
            <View style={styles.container}>
                <Feather
                    name='search'
                    size={25}
                    color={'#ffffff'}
                    style={{ marginHorizontal: 8 }}
                />
                <TextInput
                    style={styles.InputContainerStyle}
                    onChangeText={(text) => handleOnChangeText(text)}
                    value={SearchQuery}
                    placeholder='Search'
                    underlineColorAndroid="rgba(255,255,255,0)"
                />
            </View>
            {
                SearchQuery.length && ResultData.length ?
                    <FlatList
                        ListHeaderComponent={<Text style={{ textAlign: 'center', color: '#ffffff' }}>Search Results</Text>}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={SearchQuery.length ? ResultData : []}
                        keyExtractor={item => item}
                        renderItem={renderItem}
                    />
                    :
                    (<></>)
            }
            {
                SearchQuery.length ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            searchProgress ?
                                <ActivityIndicator size="large" color="#2fe073" />
                                :
                                (<></>)
                        }
                    </View>
                    :
                    (<></>)

            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    InputContainerStyle: {
        color: '#ffffff',
        fontSize: 15
    },
    contactName: {
        fontSize: 17,
        paddingVertical: 15,
        paddingHorizontal: 30,
        color: '#ffffff',
        fontStyle: 'italic'
    }
})
export default SearchBar;