import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { LayoutGrid, MessageCircleMore, Search, UserRound } from "lucide-react-native";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function TabLayout() {

  // Import the all font in my file
    const [fontsLoaded,fontError] = useFonts({
    'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
    'Outfit-Bold': require('../../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('../../assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit-ExtraLight': require('../../assets/fonts/Outfit-ExtraLight.ttf'),
    'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('../../assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Thin': require('../../assets/fonts/Outfit-Thin.ttf'),
    })

      useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }

    // if (fontsLoaded) {
    //   SplashScreen.hideAsync();
    // }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
     <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF"  translucent={true} />
      <Tabs
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          // tabBarStyle: styles.tabBar,
          tabBarHideOnKeyboard: true, // Hides tab bar when keyboard opens

          tabBarStyle:{
             borderTopWidth: 0,
          backgroundColor: "#ffffff",
          },
          tabBarIcon:({focused})=>{
            let IconComponet =LayoutGrid

            switch(route.name){
              case "home":
                IconComponet=LayoutGrid;
                break
              case "chat":
                IconComponet=MessageCircleMore;
                break
              case "search":
                IconComponet = Search;
                break
              case "user":
                IconComponet = UserRound;
                break
            }

            return (<IconComponet size={24} color={focused ? "#8681FB":"#6b6d6e"} />)

          }
        })}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="chat" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="user" />
      </Tabs>
    </SafeAreaView>
  );
}
