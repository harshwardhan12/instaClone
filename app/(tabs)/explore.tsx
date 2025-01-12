import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from "react";
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

const {width, height} = Dimensions.get("window");

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profilePictureZzz, setProfilePicture] = useState(null);

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

    const handleSignUp = () => {
        if (!email.includes("@")) {
            Alert.alert("Please enter a valid email");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Password must contain at least 6 characters");
            return;
        }
        if (!confirmPassword || !username) {
            Alert.alert("Please fill out all fields");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
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
                    navigation.navigate("Home");
                }, 2000);
            })
            .catch((e) => {
                console.error('Failed to save data to AsyncStorage', e);
            });
    };

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

                    <ScrollView showsVerticalScrollIndicator={false}>

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
});

export default SignUpScreen;
