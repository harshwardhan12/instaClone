import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList} from 'react-native';
import {useNavigation} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get('window');
const postsPerRow = width > 768 ? 4 : 2;  // Adjust number of posts per row based on screen width


const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        bio: '',
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userName = await AsyncStorage.getItem('userName');
                const userEmail = await AsyncStorage.getItem('userEmail');
                const userProfilePicture = await AsyncStorage.getItem('profilePicture');
                const userBio = await AsyncStorage.getItem('userBio');

                if (userName && userEmail) {
                    setUserData({
                        name: userName,
                        email: userEmail,
                        profilePicture: userProfilePicture || "",
                        bio: userBio || 'This is your bio. Tap to edit.',
                    });
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        getUserData();
    }, []);

//   const handleEditProfile = () => {
//     // Navigate to edit profile screen (create an edit profile screen if needed)
//     navigation.navigate('EditProfile');
//   };

    const handleNavigation = () => {
        navigation.navigate("EditProfile");
    };
    const handleNavigationBar = (screen: string) => {
        navigation.navigate(screen);
    };

    const renderPost = ({ item }) => (
        <Image
            source={{ uri: item }}
            style={styles.postImage}
        />
    );

    // Different image URLs for each post
    const postUrls = [
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1",
        "https://i0.wp.com/www.alphr.com/wp-content/uploads/2017/11/How-to-post-a-Live-Photo-on-Instagram1.jpg?fit=900%2C600&ssl=1"
    ];


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <Image source={{uri: userData.profilePicture}} style={styles.profileImage}/>

                    <View style={styles.profileInfo}>
                        <View style={styles.editProfile}>
                            <Text style={styles.userName}>{userData.name}</Text>
                            <TouchableOpacity onPress={handleNavigation} style={styles.editProfileButton}>Edit Profile</TouchableOpacity>
                        </View>

                        <View style={styles.profileStats}>
                            <View style={styles.profileStatsMini}>
                                <Text style={styles.profileStatsCount}>10</Text>
                                <Text style={styles.profileStatsText}>posts</Text>
                            </View>
                            <View style={styles.profileStatsMini}>
                                <Text style={styles.profileStatsCount}>135</Text>
                                <Text style={styles.profileStatsText}>followers</Text>

                            </View>
                            <View style={styles.profileStatsMini}>
                                <Text style={styles.profileStatsCount}>257</Text>
                                <Text style={styles.profileStatsText}>following</Text>

                            </View>

                        </View>

                        <View style={styles.bioSection}>
                            <Text>
                                {userData.bio}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.postsSection}>
                    <View style={styles.postsSectionTwo}>
                        <FlatList
                            data={postUrls}
                            renderItem={renderPost}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={postsPerRow}
                            columnWrapperStyle={styles.columnWrapper}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigationBar("Home")}>
                    <Text style={styles.bottomBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigationBar("Search")}>
                    <Text style={styles.bottomBarText}>Search</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    profileHeader: {
        width: width,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    editProfile: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editProfileButton: {
        backgroundColor: '#262626',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        color: 'white',
    },
    profileInfo: {
        // backgroundColor: 'blue',
        flex: 1,
    },
    profileStats: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
    profileStatsMini :{
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        flexShrink: 1,
    },
    profileStatsCount: {
        fontWeight: "bold"
    },
    profileStatsText: {
        fontFamily: "Monospace"
    },

    bioSection: {
        marginTop: 5,
    },

    postsSection: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: width,
        height: "100%",
        backgroundColor: 'black',
    },
    postsSectionTwo: {
        flexDirection: 'row',
        flexWrap: 'wrap',    // Allows wrapping to the next line
        gap: 2,
        marginTop: 5,
    },
    postImage: {
        // flex: 1,
        width: (width - 40) / postsPerRow,
        height: height*0.3,
        borderRadius: 8,
        marginBottom: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },






    userInfo: {
        flex: 1,
    },
    editButtonText: {
        color: '#fff',
    },
    bioTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bioText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    posts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    postItem: {
        width: '30%',
        marginBottom: 10,
    },


    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",

    },
    bottomBarItem: {
        alignItems: "center",
    },
    bottomBarText: {
        fontSize: 16,
        color: "#fff",
    },

});

export default ProfileScreen;
