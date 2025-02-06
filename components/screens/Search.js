import * as React from 'react';
import { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import StyleExample from '../styles/StyleExample';

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState(''); // State to store input data
    return (
        <SafeAreaView style={StyleExample.container}>
            <Text style={styles.header}>Link Your Interest! It's Swaggy!!!</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Search..." 
                value={searchQuery} 
                onChangeText={setSearchQuery} // Updates state with input
            />
            <Text style={styles.resultText}>You searched for: {searchQuery}</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 550,
    },
});