import React, { useState } from 'react'
import Color from '../constants/Color'
import { View, Text, StyleSheet } from 'react-native'


const CustomButton = props => {
    const { title } = props
    const [data, setData] = useState([])
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer: {
        width: 100,
        height: 50,
        borderRadius: 50,
        backgroundColor: Color.yellow,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',

    }
})