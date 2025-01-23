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
    Image,
    Dimensions,
    ImageBackground
} from "react-native";
import {useNavigation} from "expo-router";

const {width, height} = Dimensions.get("window");

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    // Fetch stored data from AsyncStorage on load
    useEffect(() => {
        const loadProfileData = async () => {
            const storedUsername = await AsyncStorage.getItem('userName');
            const storedBio = await AsyncStorage.getItem('userBio');
            const storedProfilePicture = await AsyncStorage.getItem('profilePicture');

            if (storedUsername) setUsername(storedUsername);
            if (storedBio) setBio(storedBio);
            if (storedProfilePicture) setProfilePicture(storedProfilePicture);
        };

        loadProfileData();
    }, []);

    // Handle profile picture picking
    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need permission to access your photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // Check if result is not canceled and has a URI property
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePicture(result.assets[0].uri); // Access uri from the first asset
        }
    };

    // Handle save profile
    const handleSaveProfile = () => {
        if (!username || !bio) {
            Alert.alert("Please fill out all fields");
            return;
        }

        AsyncStorage.setItem('userName', username)
            .then(() => AsyncStorage.setItem('userBio', bio))
            .then(() => AsyncStorage.setItem('profilePicture', profilePicture || ''))
            .then(() => {
                Alert.alert("Profile updated successfully!");
                navigation.goBack();
            })
            .catch((e) => {
                console.error('Failed to save profile data', e);
            });
    };

    const handleNavigation = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={{
                uri: "https://imgs.search.brave.com/eLWjFJEwIyGOySCIMRrgcBP9mkcX1dCUFwBvteD4atU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm1ha2V1c2Vv/ZmltYWdlcy5jb20v/d29yZHByZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/LzYuLVN1YmxpbWUt/bGlnaHQucG5n",
            }} style={styles.backgroundImage}>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Edit Profile</Text>

                    {/* Profile Picture */}
                    <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
                        {profilePicture ? (
                            <Image source={{uri: profilePicture}} style={styles.profilePic}/>
                        ) : (
                            <Text style={styles.profilePicText}>Choose Profile Picture</Text>
                        )}
                    </TouchableOpacity>

                    {/* Username */}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="grey"
                        onChangeText={setUsername}
                        value={username}
                    />

                    {/* Bio */}
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        placeholderTextColor="grey"
                        onChangeText={setBio}
                        value={bio}
                    />

                    {/* Save Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                </View>

                {/*<View style={styles.bottomBar}>*/}
                {/*    <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Home")}>*/}
                {/*        <Text style={styles.bottomBarText}>Home</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Search")}>*/}
                {/*        <Text style={styles.bottomBarText}>Search</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Profile")}>*/}
                {/*        <Text style={styles.bottomBarText}>Profile</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </ImageBackground>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        backgroundColor: 'rgba(200, 200, 200, 0.5)', /* Example transparent background */
        backdropFilter: 'blur(1px)', /* Apply blur to the background */
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
    // bottomBar: {
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     backgroundColor: "black",
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     paddingVertical: 10,
    //     borderTopWidth: 1,
    //     borderTopColor: "#ddd",
    // },
    // bottomBarItem: {
    //     alignItems: "center",
    // },
    // bottomBarText: {
    //     fontSize: 16,
    //     color: "#fff",
    // },

});

export default EditProfileScreen;
