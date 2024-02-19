import React, { useState, useEffect } from 'react';
import { Alert, AppState, View, StyleSheet } from 'react-native';
import { supabase } from '../supabase.js';
import { Button, Input } from 'react-native-elements'
import { useUserContext } from '../components/UserContext/UserContext.js';

const SignInScreen = ({ route, navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // const { setUserCompletedInitialPages } = useUserContext();
    // setUserCompletedInitialPages(true);

    const { setUserId } = useUserContext();

    const { handleUserCompletion } = route.params;

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
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
    
        if (error) {
            Alert.alert(error.message);
        } else if (data) {
            const userId = data.session.user.id; // get the user's id
            setUserId(userId); // set the user's id in the context
            console.log("User id: ", userId);

            // Check if the user has completed the initial pages
            const { data: userData, error: userError } = await supabase
                .from('User')
                .select('setupCompleted')
                .eq('authUserID', userId);
            if (userError) {
                console.error('Error fetching user data:', userError);
                return;
            }
            // if the setup has been completed aka the setupCompleted flag is true
            if (userData[0].setupCompleted) {   
                handleUserCompletion();
            } else {
                // navigate to welcome so the sign up process can be redone
                navigation.navigate('Welcome')
            }
        } else {
            console.log("No data returned");
            Alert.alert("Something went wrong. Please try again.");
        }
        setLoading(false);
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
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#014EAA', // Set the background color to #014EAA
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

export default SignInScreen;