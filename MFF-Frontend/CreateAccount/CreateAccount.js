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

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) { 
            Alert.alert(error.message)
        }
        else {
            setUserCompletedInitialPages(true);
        }
        setLoading(false)
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
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
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