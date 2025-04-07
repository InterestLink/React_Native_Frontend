import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function Login({ navigation, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false); // Toggle between modes

    const handleAuth = () => {
        if (isSignup) {
            // Signup validation
            if (password !== confirmPassword) {
                Alert.alert("Error", "Passwords don't match!");
                return;
            }
            console.log('Signup attempted with:', email, password);
        } else {
            // Login validation
            console.log('Login attempted with:', email, password);
        }
        onLogin(); // Temporary bypass
    };

    const handleGuestLogin = () => {
        console.log('Continuing as guest');
        onLogin();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSignup ? 'Create Account' : 'Login'}</Text>
            
            {/* Email Field */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            {/* Password Field */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {/* Confirm Password (Signup only) */}
            {isSignup && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            )}
            
            {/* Auth Button */}
            <Button 
                title={isSignup ? 'Sign Up' : 'Login'} 
                onPress={handleAuth} 
            />
            
            {/* Toggle Link */}
            <TouchableOpacity 
                onPress={() => setIsSignup(!isSignup)}
                style={styles.toggleButton}
            >
                <Text style={styles.toggleText}>
                    {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
                </Text>
            </TouchableOpacity>
            
            {/* Guest Login */}
            <TouchableOpacity 
                onPress={handleGuestLogin} 
                style={styles.guestButton}
            >
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
    toggleButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    toggleText: {
        color: 'blue',
        textDecorationLine: 'underline',
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