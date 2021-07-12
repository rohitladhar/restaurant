import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import SingleItemList from '../component/SingleItemList'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../constants/Color'
const ItemListHomeScreen = ({ route }) => {
    const { data } = route.params
    const [list, setList] = useState(data)
    const [sorting, setSorting] = useState('Low')

    const sortingState = () => {
        if (sorting === 'Low') {
            setSorting('High')
        } else {
            setSorting('Low')
        }
    }
    useEffect(() => {
        if (sorting === 'Low') {
            const products = list.sort(function (a, b) {
                return b.price - a.price;
            });
            setList(products)
        }
        if (sorting === 'High') {
            const products = list.sort(function (a, b) {
                return a.price - b.price;
            });
            setList(products)
        }
    }, [sorting])
    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '100%' }}
                data={list}
                renderItem={({ item }) => <SingleItemList foodItem={item} />}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
                style={styles.filter}
                onPress={sortingState}
            >
                <MaterialCommunityIcons name="filter" size={80} color={Color.grey} />
            </TouchableOpacity>

        </View>
    )
}

export default ItemListHomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        flexDirection: 'row'
    },
    filter: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: ' 1%',
        marginBottom: '17%',
    },
})