import React, { useState, useEffect } from 'react';
import { Alert, AppState, View, StyleSheet } from 'react-native';
import { supabase } from '../supabase.js';
import { Button, Input } from 'react-native-elements'
import { useUserContext } from '../components/UserContext/UserContext.js';


const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { setUserCompletedInitialPages } = useUserContext();
    setUserCompletedInitialPages(true);

    const { setUserId } = useUserContext();

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    const handleAppStateChange = (state) => {
        if (state === 'active') {
            supabase.auth.startAutoRefresh()
        } else {
            supabase.auth.stopAutoRefresh()
        }
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
        }
        else if (!session) {
            Alert.alert('Please check your inbox for email verification!')
        }
        else {
            // insert user UUID into User table column "authUserID"
            const { data, error } = await supabase
                .from('User')
                .insert([{ authUserID: session.user.id }])
                .single()
            if (error) {
                Alert.alert(error.message)
            }
            setUserId(session.user.id);
            navigation.navigate('Welcome')
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white'}}
                    leftIconContainerStyle={{ marginRight: 5 }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                    // make the text white
                    inputStyle={{ color: 'white' }}
                    labelStyle={{ color: 'white' }}
                    placeholderTextColor={'white'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white'}}
                    leftIconContainerStyle={{ marginRight: 5 }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                    inputStyle={{ color: 'white' }}
                    labelStyle={{ color: 'white' }}
                    placeholderTextColor={'white'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Sign up"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                    buttonStyle={{ backgroundColor: '#3E89E1' }}
                    titleStyle={{ fontWeight: 'bold' }} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A2633', // Set the background color to #014EAA
        flex: 1, // Add this line to make the container fill the entire screen
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})

export default CreateAccount;