// app/_layout.jsx
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider, useAuth } from "../context/authContext";


function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("AuthLayout - isAuthenticated:", isAuthenticated);
    console.log("AuthLayout - segments:", segments);
    
    if (typeof isAuthenticated === "undefined") return;
    
    //Add check for empty segments
    if (segments.length === 0) {
      console.log("Segments empty, waiting...");
      return;
    }
    
    const currentSegment = segments[0];
    const isInTabs = currentSegment == "(tabs)";
    
    console.log("AuthLayout - currentSegment:", currentSegment);
    console.log("AuthLayout - isInTabs:", isInTabs);
    
    if (isAuthenticated && !isInTabs) {
      console.log("Redirecting authenticated user to /(tabs)/home");
      // router.replace("/(tabs)/home");
      router.replace("/home");
    } else if (isAuthenticated == false) {
      console.log("Redirecting unauthenticated user to /welcome");
      router.replace("/role");
      // router.replace("/login");
    }
  }, [isAuthenticated]);

  return null;
}
export default function RootLayout() {
  return (
   <AuthContextProvider>
      <SafeAreaProvider>
         <AuthLayout />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Landing" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="role" />
          <Stack.Screen name="registerTeachers" />
          <Stack.Screen name="registerTeachers_2" />
          <Stack.Screen name="teacherSubjectSuggestion" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}