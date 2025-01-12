import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

const posts = [
  {
    id: 1,
    user: "User1",
    image:
      "https://images.unsplash.com/photo-1736478770857-ed521c3b469c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    caption: "Caption 1",
  },
  {
    id: 2,
    user: "User2",
    image:
      "https://images.unsplash.com/photo-1736478770857-ed521c3b469c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    caption: "Caption 2",
  },
  {
    id: 3,
    user: "User3",
    image:
      "https://images.unsplash.com/photo-1736478770857-ed521c3b469c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    caption: "Caption 3",
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState<any[]>([]); // Updated to use state with empty array
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userProfilePicture = await AsyncStorage.getItem('profilePicture');
        
        if (userName && userEmail) {
          const profilePic = userProfilePicture || 'https://media.istockphoto.com/id/2166146715/photo/close-up-of-a-cat-looking-away.webp?a=1&b=1&s=612x612&w=0&k=20&c=RX7FVxEZq4hnKJXXXQHIclBN_bjz1CbPstoISeBcfSY='; // Default profile picture
  
          setUserData({
            name: userName,
            email: userEmail,
            profilePicture: profilePic,
          });
  
          // Update stories dynamically
          setStories([
            {
              id: 1,
              name: userName, // Dynamic username
              image: profilePic, // Dynamic profile picture
            },
            {
              id: 2,
              name: "user2",
              image: "",
            },
            {
              id: 2,
              name: "user3",
              image: "",
            },{
              id: 2,
              name: "user4",
              image: "",
            },{
              id: 2,
              name: "user5",
              image: "",
            },
          ]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
  
    getUserData();
  }, []);
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn"); // Clear login state
      navigation.navigate("Login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.instagramText}>Instagram</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout <Icon name="logout" size={15} color="white" /></Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >       
        <View style={styles.storiesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContentContainer}
          >
            {stories.map((story) => (
              <View key={story.id} style={styles.story}>
                <Image
                  source={{ uri: story.image }}
                  style={styles.storyImage}
                />
                <Text style={styles.storyText}>{story.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.postsContainer}>
          <ScrollView contentContainerStyle={styles.postsContentContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.post}>
                <Text style={styles.postUser}>{post.user}</Text>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <Text style={styles.postCaption}>{post.caption}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Home")}>
          <Text style={styles.bottomBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Search")}>
          <Text style={styles.bottomBarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Profile")}>
          <Text style={styles.bottomBarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 70, // Leave space for the bottom bar
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "black"
  },
  instagramText: {
    fontSize: 30,
    fontFamily: "Verdana",
    color: "white"
  },

  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  storiesContainer: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // marginTop: 1,
    paddingVertical: 4,
    backgroundColor: "grey",
    flex: 1
  },
  storiesContentContainer: {
    alignItems: "center", // Moved from story styles to here
  },
  story: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  storyImage: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    marginBottom: 5,
    backgroundColor: "orange",
  },
  storyText: {
    fontSize: 12,
  },

  postsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  postsContentContainer: {
    alignItems: "center", // Moved here
  },
  post: {
    marginBottom: 20,
  },
  postUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  postImage: {
    width: 375,
    height: 300,
    marginBottom: 5,
  },
  postCaption: {
    marginTop: 5,
    fontSize: 14,
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

export default HomeScreen;
