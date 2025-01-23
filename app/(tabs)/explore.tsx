import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ImageBackground,
    Image,
    Dimensions
} from "react-native";
import {useNavigation} from "expo-router";
import {ScrollView} from "react-native";
import {ActivityIndicator} from "react-native";

const {width, height} = Dimensions.get("window");

interface SignupError {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}


const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profilePictureZzz, setProfilePicture] = useState(null);
    const [error, setError] = useState<SignupError>({});

    // Handle profile picture picking
    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need permission to access your photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // Check if result is not canceled and has a URI property
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePicture(result.assets[0].uri); // Access uri from the first asset
        }

    };

    const handleOldUser = () => {
        navigation.navigate('Login');
    };

    const validation = (): boolean => {
        const newErrors: SignupError = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!email.includes("@")) {
            newErrors.email = "Invalid email: @ is missing";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        } else if (email.includes(" ")) {
            newErrors.email = "Email should not contain spaces";
        }

        if (!username.trim()) {
            newErrors.username = "Username is required";
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters long";
        } else if (username.length > 20) {
            newErrors.username = "Username must not exceed 20 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores";
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

        if (!confirmPassword.trim()) {
            newErrors.password = "Confirm Password is required";
        } else if (password !== confirmPassword) {
            newErrors.password = "Passwords must match";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // useEffect(()=>{
    //     validation()
    // }, [email])


    const handleSignUp = () => {
        if(!email.trim()) {
            const newError: SignupError = {};
            newError.email = "Please enter email.";
            setError(newError);
            return;
        }
        if(!username.trim()) {
            const newError: SignupError = {};
            newError.username = "Please enter username.";
            setError(newError);
            return;
        }
        if(!password.trim() || !confirmPassword.trim()) {
            const newError: SignupError = {};
            newError.password = "Please enter password";
            setError(newError);
            return;
        }

        if(! validation()){
            console.log("validation failed");
            return;
        }


        setIsLoading(true);

        AsyncStorage.setItem('userEmail', email)
            .then(() => AsyncStorage.setItem('userPassword', password))
            .then(() => AsyncStorage.setItem('userName', username))
            .then(() => AsyncStorage.setItem('profilePicture', profilePictureZzz || ''))  // Store profile picture URI
            .then(() => AsyncStorage.setItem('isLoggedIn', 'true'))
            .then(() => {
                // Simulate a delay and navigate to the home screen
                setTimeout(() => {
                    setIsLoading(false);
                    console.log('SignedUp');
                    navigation.navigate("Home");
                }, 2000);
            })
            .catch((e) => {
                console.error('Failed to save data to AsyncStorage', e);
                setIsLoading(false);
            });
    };
    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={{
                    uri: "https://imgs.search.brave.com/eLWjFJEwIyGOySCIMRrgcBP9mkcX1dCUFwBvteD4atU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm1ha2V1c2Vv/ZmltYWdlcy5jb20v/d29yZHByZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/LzYuLVN1YmxpbWUt/bGlnaHQucG5n",
                }}
                style={styles.backgroundImage}
            >
                <View style={styles.inputContainer}>

                    <Text style={styles.title}>Sign Up</Text>

                    {/* Profile Picture */}
                    <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
                        {profilePictureZzz ? (
                            <Image source={{uri: profilePictureZzz}} style={styles.profilePic}/>
                        ) : (
                            <Text style={styles.profilePicText}>Choose Profile Picture</Text>
                        )}
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }} showsVerticalScrollIndicator={false}>

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="grey"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="grey"
                            onChangeText={setUsername}
                            value={username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="grey"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="grey"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry
                        />
                        {error.email && <Text style={styles.errorMessage}>{error.email}</Text>}
                        {error.username && <Text style={styles.errorMessage}>{error.username}</Text>}
                        {error.password && <Text style={styles.errorMessage}>{error.password}</Text>}
                        {error.confirmPassword && <Text style={styles.errorMessage}>{error.confirmPassword}</Text>}



                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.loginLink}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={handleOldUser}>
                                <Text style={styles.loginLinkText}> Login</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>


                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFD5CD",
    },
    backgroundImage: {
        height: height,
        width: width,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "Black",
    },
    inputContainer: {
        width: 300,
        height: height * 0.8,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', /* Example transparent background */
        backdropFilter: 'blur(2px)', /* Apply blur to the background */
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 15,
    },
    input: {
        width: 250,
        padding: 10,
        height: 40,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "white",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginLink: {
        marginTop: 5,
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    loginLinkText: {
        color: "blue",
        fontSize: 16,

    },
    profilePicContainer: {
        backgroundColor: "#e0e0e0",
        width: 100,
        height: 100,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    profilePicText: {
        textAlign: 'center',
        color: '#888',
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
    }
});

export default SignUpScreen;
