// mockData.ts

// Define the type for a single user profile
export interface UserProfile {
    id: string;
    username: string;
    profile: string;
}

// Define the mock data with the type
const mockData: UserProfile[] = [
    { id: '1', username: 'john_doe', profile: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', username: 'jane_smith', profile: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', username: 'jackson_lee', profile: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', username: 'susan_brown', profile: 'https://randomuser.me/api/portraits/women/4.jpg' },
    // More mock data for search results...
];

export default mockData;
