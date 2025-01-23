import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import mockData, { UserProfile } from '../../src/data/mockData';

// const mockData = [
//     { id: '1', username: 'john_doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
//     { id: '2', username: 'jane_smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
//     { id: '3', username: 'jackson_lee', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
//     { id: '4', username: 'susan_brown', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
//     // More mock data for search results...
// ];

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Handle the search input and filter results
    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = mockData.filter(item => item.username.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);

        // Filter only if text is not empty
        if (text.trim() !== '') {
            const filtered = mockData.filter(item =>
                item.username.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]); // Clear results if no input
        }
    };

    // // Navigate to 'OtherProfile' on profile click
    // const handleProfileClick = (user: UserProfile) => {
    //     navigation.navigate('OtherProfile', { user }); // Pass user data as a parameter
    // };

    const renderItem = ({ item } : { item: UserProfile}) => (
        <TouchableOpacity
            style={styles.resultItem}

        >
            <Image source={{ uri: item.profile }} style={styles.profile} />
            <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
    );

    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Search Results */}
            {searchQuery.trim() === '' || filteredData.length === 0 ? (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>
                        {searchQuery.trim() === '' ? 'Start typing to search profiles' : 'No results found'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.resultsContainer}
                />
            )}

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarItem} onPress={() => handleNavigation("Home")}>
                    <MaterialCommunityIcons name="home-variant" size={24} color="white" />
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
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        width: '100%',

    },
    resultsContainer: {
        marginTop: 10,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: 'gray',
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

export default SearchScreen;
