import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {useNavigation} from 'expo-router';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator} from "react-native";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const {width, height} = Dimensions.get("window");

interface LoginError {
    email?: string;
    password?: string;
}


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<LoginError>({});

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
                if (isLoggedIn === 'true') {
                    navigation.navigate("Home");
                } else {
                    console.log("Not logged in");
                    navigation.navigate("Login");
                }
            } catch (error) {
                console.error("Error reading login status", error);
            } finally {
                setIsLoading(false); // Stop loading after checking login state
            }

        };

        checkLoginStatus();
    }, []); // Empty dependency array to run only once when the app starts


    if (isLoading) {
        // Show a loading spinner while checking login status
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    const handleCreateAccount = () => {
        navigation.navigate('SignUp');
    };

    const validation = (): boolean => {
        const newErrors: LoginError = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!email.includes("@")) {
            newErrors.email = "Invalid email: @ is missing";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        } else if (email.includes(" ")) {
            newErrors.email = "Email should not contain spaces";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/\d/.test(password)) {
            newErrors.password = "Password must contain at least one number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = "Password must contain at least one special character";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {

        if(!validation()){
            console.log("Validation error");
            return;
        }

        setIsLoading(true);

        setTimeout(async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                const storedPassword = await AsyncStorage.getItem('userPassword');

                if (email.trim() === storedEmail && password.trim() === storedPassword) {
                    console.log('Success', `Logged in as ${email.trim()}`);
                    Alert.alert('Success', `Logged in as ${password.trim()}`);

                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    navigation.navigate('Home');
                } else {
                    setError({ email: "Invalid email or password" });
                    console.log('abe bherupiye nikal');
                }
            } catch (error) {
                console.error('Error during login', error);
            } finally {
                setIsLoading(false);
            }
        }, 2000);
    };

    // useEffect(() => {
    //     validation();
    // }, [email, password])




    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={{uri: 'https://imgs.search.brave.com/eLWjFJEwIyGOySCIMRrgcBP9mkcX1dCUFwBvteD4atU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm1ha2V1c2Vv/ZmltYWdlcy5jb20v/d29yZHByZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/LzYuLVN1YmxpbWUt/bGlnaHQucG5n'}}
                style={styles.backgroundImage}
            >
                <View style={styles.inputBlock}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        placeholderTextColor="grey"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {error.email && <Text style={styles.errorMessage}>{error.email}</Text>}

                    {/*<Text style={styles.errorMessage}>{error}</Text>*/}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.createAccount}>
                        <Text>New here?</Text>
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <Text style={styles.createAccountText}> Create new account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#DFD5CD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        height: height,
        width: width,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBlock: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', /* Example transparent background */
        backdropFilter: 'blur(2px)', /* Apply blur to the background */
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 350,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'Black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        width: "100%",
        backgroundColor: '#007BFF',
        paddingTop: 6,
        paddingBottom: 6,
        marginTop: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createAccount: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18,
    },
    createAccountText: {
        color: 'blue',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
    }
});

export default LoginScreen;