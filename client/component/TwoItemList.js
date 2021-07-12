import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { addCart } from '../actions/cartAction'
import { useDispatch } from 'react-redux'
const TwoItemList = props => {
    const { id, name, category, image, price } = props.foodItem
    const dispatch = useDispatch()
    function addToCart(id, name, price, image) {
        dispatch(addCart(id, name, price, image))
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => addToCart(id, name, price, image)}>
            <View style={styles.subContainer}>
                <Image source={image} style={{ width: 160, height: 160 }} />
                <Text style={styles.name} >{name}</Text>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.price}><Text style={styles.symbol}>₹</Text> {price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TwoItemList

const styles = StyleSheet.create({
    container: {
        width: '44%',
        margin: 10,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 10
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
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    symbol: {
        color: 'red'
    }
})
