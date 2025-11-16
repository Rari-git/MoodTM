import { Ionicons } from '@expo/vector-icons';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
// 1. Am corectat căile de import din 'components' (un nivel în sus)
import { moodConfig } from '../constants/moods';
import styles from '../constants/styles';
import { useMood } from '../contexts/MoodContext';
// 2. Am adăugat importul pentru 'useAuth' (folosind numele tău 'Authcontext')
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { mood } = useMood();
  // 3. Am apelat hook-ul 'useAuth' pentru a obține funcția 'logout'
  const { logout } = useAuth();
  const currentMood = mood ? moodConfig[mood] : null;

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Edit profile functionality would go here");
  };

  const handleLogout = () => { 
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          // 4. AICI ESTE MODIFICAREA CHEIE:
          // Am înlocuit Alert-ul cu funcția 'logout' din context
          onPress: () => logout() 
        }
      ]
    );
  };

  return (
    <ImageBackground source={currentMood?.background} style={styles.bgImage}>
      <View style={styles.sceneContent}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: currentMood?.primaryColor }]}>
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text style={styles.title}>John Doe</Text>
          <Text style={styles.subtitle}>john.doe@example.com</Text>
          <Text style={styles.profileStats}>Member since January 2024</Text>
        </View>

        {/* Profile Action Button */}
        <View style={styles.profileActionsContainer}>
          <TouchableOpacity 
            style={[styles.profileActionBtn, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handleEditProfile}
          >
            <Ionicons name="create-outline" size={24} color="white" />
            <Text style={styles.actionText}>Edit Profile</Text> 
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.profileActionBtn, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={styles.actionText}>Log Out</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </ImageBackground>
  );
}