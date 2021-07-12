import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../constants/Color'
import { addCart } from '../actions/cartAction'
import { useDispatch } from 'react-redux'
const SingleItemList = props => {
    const { id, name, category, image, price, caloriesDescription, prepare } = props.foodItem

    const dispatch = useDispatch()
    function addToCart(id, name, price, image) {
        dispatch(addCart(id, name, price, image))
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => addToCart(id, name, price, image)}>
                <View style={styles.subContainer}>
                    <Image source={image} style={{ width: 160, height: 160 }} />
                </View>
                <View style={styles.subContainerRight}>
                    <Text style={styles.name} >{name}</Text>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.calories}>
                        <MaterialCommunityIcons name="fire" size={20} color={'red'} />
                        {caloriesDescription}<Text> Calories</Text></Text>
                    <Text style={styles.price}>₹ {price}</Text>
                    <Text style={styles.prepare}>
                        <MaterialCommunityIcons name="clock" size={20} color={Color.blue} />
                        {prepare}</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default SingleItemList

const styles = StyleSheet.create({
    container: {
        width: '94%',
        margin: 10,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    category: {
        fontSize: 9
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Color.green
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    subContainerRight: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    prepare: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Color.blue
    },
    calories: {
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold'
    }
})
