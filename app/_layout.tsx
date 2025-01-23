import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./(tabs)/index";
import SignUpScreen from "./(tabs)/explore";
import HomeScreen from "./(Screen)/home";
import ProfileScreen from "./(Screen)/profileScreen";
import EditProfileScreen from "@/app/(Screen)/editProfileScreen";
import OtherProfileScreen from "@/app/(Screen)/otherProfile";
import NotFoundScreen from "./+not-found";

const Stack = createNativeStackNavigator();

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import SearchScreen from "@/app/(Screen)/searchScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtherProfile" component={OtherProfileScreen} options={{ headerShown: false }} />

        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
