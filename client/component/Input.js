import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../constants/Color';
const Input = (props) => {
    const { icon, label, secureText } = props
    const [error, setError] = useState({})
    
    //const error = "This is error message"
    return (
        <View>
            <View style={styles.screen}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name={icon} size={35} color={Color.darkYellow} />
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.labelText}>{label}</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            multiline={false}
                            secureTextEntry={secureText}
                            placeholder={'Enter Value'}
                            
                        />

                    </View>
                </View>
            </View>
            <View style={{ height: 10, justifyContent: 'center' }}  >
                <Text style={{ color: 'red', paddingLeft: 15 }}>
                    {error}
                </Text>
            </View>
        </View>


    )
}

export default Input

const styles = StyleSheet.create({
    screen: {
        width: '90%',
        height: 70,
        margin: 10,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
    },
    iconContainer: {
        paddingTop: '8%',
        paddingHorizontal: '3%'
    },
    textInput: {
        color: Color.darkYellow,
        fontSize: 17
    },
    labelText: {
        color: 'black',
        fontSize: 17
    }
})
