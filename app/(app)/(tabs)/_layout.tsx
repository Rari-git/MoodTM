// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { moodConfig } from '../../../constants/moods';
import styles from '../../../constants/styles';
import { useMood } from '../../../contexts/MoodContext';

// Importăm ecranele din noul folder 'components'
import HomeScreen from '../../../components/HomeScreen';
import ProfileScreen from '../../../components/ProfileScreen';
import SettingsScreen from '../../../components/SettingsScreen';

// Rutele pentru TabView
const routesConfig = [
  { key: "home", title: "Home", icon: "home" },
  { key: "profile", title: "Profile", icon: "person" },
  { key: "settings", title: "Settings", icon: "settings" },
];

// Creăm "scenele" pentru TabView
const renderScene = SceneMap({
  home: HomeScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
});

export default function TabViewLayout() {
  const layout = useWindowDimensions();
  const { mood, isLoading } = useMood();
  const router = useRouter();
  const [index, setIndex] = useState(0); // Starea pentru indexul tab-ului curent

  // Logica de redirecționare dacă nu e setată starea
  useEffect(() => {
    if (!isLoading && !mood) {
      router.replace('../moodSelect');
    }
  }, [isLoading, mood, router]);

  // Așteptăm încărcarea stării sau redirecționarea
  if (isLoading || !mood) {
    return null;
  }

  const currentMoodConfig = moodConfig[mood!];

  // Funcția care randează bara de tab-uri personalizată
  const renderTabBar = () => (
    <LinearGradient
      colors={currentMoodConfig.gradient as any}
      style={styles.tabBar}
    >
      {routesConfig.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={styles.tabItem}
          onPress={() => setIndex(i)} // Schimbă indexul la apăsare
        >
          <Ionicons
            name={route.icon as any}
            size={26}
            color={i === index ? "white" : "rgba(255,255,255,0.7)"}
          />
          <Text
            style={[
              styles.tabText,
              { color: i === index ? "white" : "rgba(255,255,255,0.7)" },
            ]}
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <TabView
        navigationState={{ index, routes: routesConfig }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar} 
        swipeEnabled={true}
        tabBarPosition="bottom" // <-- ADAUGĂ ACEASTĂ LINIE
      />
    </View>
  );
}