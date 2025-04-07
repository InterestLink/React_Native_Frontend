import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Login({ navigation, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // For now, just log and proceed
        console.log('Login attempted with:', email, password);
        onLogin(); // Bypass auth for now
    };

    const handleGuestLogin = () => {
        console.log('Continuing as guest');
        onLogin(); // Bypass auth for now, replace with guest login logic if needed or delete this
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            
            {/* Guest login option */}
            <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
                <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    guestButton: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    guestText: {
        color: 'tomato',
        fontWeight: 'bold',
    },
});