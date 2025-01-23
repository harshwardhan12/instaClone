import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get("window");

const posts = [
  {
    id: 1,
    user: "Jane",
    profileImage: "https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D  ",

    image:
      "https://images.unsplash.com/photo-1736478770857-ed521c3b469c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    caption: "Caption 1",
  },
  {
    id: 2,
    user: "User2",
    profileImage: '',
    image:
      "https://images.unsplash.com/photo-1736754075245-2d2a75639fea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D",
    caption: "Caption 2",
  },
  {
    id: 3,
    user: "User3",
    profileImage: '',
    image:
      "https://images.unsplash.com/photo-1736754079627-b6ca8f3f93b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    caption: "Caption 3",
  },
  {
    id: 4,
    user: "User4",
    profileImage: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww',
    image:
        "https://plus.unsplash.com/premium_photo-1707486533473-e2bcf3e9cd01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFuJTIwcGxheWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    caption: "Caption 4",
  },
  {
    id: 5,
    user: "User5",
    profileImage: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww',
    image:
        "https://images.unsplash.com/photo-1500027202745-eec1ad6523cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMHBsYXlpbmd8ZW58MHx8MHx8fDA%3D",
    caption: "Caption 5",
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
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userProfilePicture = await AsyncStorage.getItem('profilePicture');
        
        if (userName && userEmail) {
          const profilePic = userProfilePicture || 'https://i.pinimg.com/736x/5b/30/5f/5b305fca208d6162872c715f4c7643e1.jpg'
  
          setUserData({
            name: userName,
            email: userEmail,
            profilePicture: profilePic,
          });
  
          // Update stories dynamically
          setStories([
            {
              id: 1,
              name: "Your story",
              image: profilePic, // Dynamic profile picture
            },
            {
              id: 2,
              name: "ig_sophia",
              image: "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V8ZW58MHx8MHx8fDA%3D",
            },
            {
              id: 3,
              name: "olivia_12",
              image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=",
            },{
              id: 4,
              name: "emma",
              image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
            },{
              id: 5,
              name: "ethan",
              image: "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=wQTkPBW1rlfaFAkKanmLbpmEtiWWVH33UkndM1ib1-o=",
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
           <Icon name="logout" size={20} color="white" />
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

                <View style={styles.postHeader}>
                  <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
                  <Text style={styles.postUser}>{post.user}</Text>
                </View>

                <Image source={{ uri: post.image }} style={styles.postImage} />

                <View style={styles.iconsContainer}>
                  <TouchableOpacity onPress={() => toggleLike(post.id)}>
                    <FontAwesome
                        name={likedPosts[post.id] ? 'heart' : 'heart-o'}
                        size={24}
                        color={likedPosts[post.id] ? '#e74c3c' : '#333'}
                        style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="chatbubble-outline" size={24} color="#333" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="send" size={24} color="#333" style={styles.icon} />
                  </TouchableOpacity>

                </View>

                <View style={styles.captionContainer}>
                  <Text style={styles.postUser}>{post.user}</Text>
                  <Text style={styles.postCaption}>{post.caption}</Text>
                </View>

              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Home")}>
          <MaterialCommunityIcons name="home-variant" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Search")}>
          <IoniconsIcons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Profile")}>
          <MaterialCommunityIcons name="account" size={24} color="white" />
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
    backgroundColor: "#FF3B30",

    width: 40, // Adjust size as needed
    height: 40, // Must be equal to width
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    backgroundColor: "white",
    flex: 1
  },
  storiesContentContainer: {
    alignItems: "center",
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
    backgroundColor: "grey",
  },
  storyText: {
    fontSize: 16,
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

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    gap: 5,
  },
  postUser: {
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,  // Makes it circular
    backgroundColor: '#ddd',  // Default background if the image doesn't load
  },
  postImage: {
    width: 375,
    height: 300,
    marginBottom: 5,
    borderRadius: 8,
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },

  postCaption: {
    fontSize: 14,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 10,
    marginTop: 5,
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





// import React, { useState, useEffect } from "react";
// import { View, Text, Button, FlatList, StyleSheet } from "react-native";
// import axios from "axios";
//
// interface Movie {
//   id: number;
//   title: string;
// }
//
// const MovieComponent = () => {
//   const [movies, setMovies] = useState<Movie[]>([]); // State to store movie list
//
//   // Function to search and fetch movies
//   const searchMovies = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/movie/popular?api_key=6d7357adb38c7066d89391d1b0e62a6b"
//       );
//       setMovies(response.data.results); // TMDb returns movies in 'results'
//       // console.log('hi')
//       console.log("Movies fetched:", response.data.results);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };
//
//   // Function to list movies (logs movie titles to console)
//   const getMovies = () => {
//     console.log("Movies list:");
//     movies.map((movie, index) => {
//       console.log(`${index + 1}`); // Log movie titles
//     });
//   };
//
//   useEffect(() => {
//     searchMovies(); // Fetch movies when the component mounts
//   }, []);
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Movie List</Text>
//       <Button title="Log Movies" onPress={getMovies} />
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.id.toString()} // Use movie ID as the key
//         renderItem={({ item }) => (
//           <Text style={styles.movieItem}>{item.title}</Text> // Display movie titles
//         )}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   movieItem: {
//     fontSize: 18,
//     marginVertical: 5,
//     color: "#333",
//   },
// });
//
// export default MovieComponent;
//
