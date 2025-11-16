import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { moodConfig } from '../constants/moods';
import styles from '../constants/styles';
import { useMood } from '../contexts/MoodContext';

export default function SettingsScreen() {
  const { mood } = useMood();
  const currentMood = mood ? moodConfig[mood] : null;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); 
  const [selectedLanguage, setSelectedLanguage] = useState("English"); 

  const handleNotificationsToggle = () => { 
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLanguageSelect = () => { 
    Alert.alert(
      "Select Language",
      "Choose your preferred language",
      [
        { text: "English", onPress: () => setSelectedLanguage("English") },
        { text: "Spanish", onPress: () => setSelectedLanguage("Spanish") },
        { text: "French", onPress: () => setSelectedLanguage("French") },
        { text: "German", onPress: () => setSelectedLanguage("German") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };
  
  const handlePrivacyPolicy = () => { 
    Alert.alert("Privacy Policy", "Privacy policy content would go here");
  };
  
  const handleTermsOfService = () => { 
    Alert.alert("Terms of Service", "Terms of service content would go here");
  };

  return (
    <ImageBackground source={currentMood?.background} style={styles.bgImage}>
      <View style={styles.sceneContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your app preferences</Text>
        </View>

        <View style={styles.settingsContainer}>
          {/* Notifications Toggle  */}
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handleNotificationsToggle}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Notifications</Text>
              <Text style={styles.settingSubtext}>
                {notificationsEnabled ? "Enabled" : "Disabled"} 
              </Text>
            </View>
            <Ionicons 
              name={notificationsEnabled ? "toggle" : "toggle-outline"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          {/* Language Selection */}
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handleLanguageSelect} 
          >
            <Ionicons name="language-outline" size={24} color="white" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Language</Text>
              <Text style={styles.settingSubtext}>{selectedLanguage}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handlePrivacyPolicy}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color="white" />
            <View style={styles.settingTextContainer}> 
              <Text style={styles.settingText}>Privacy Policy</Text>
              <Text style={styles.settingSubtext}>Read our privacy policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Terms of Service */}
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: currentMood?.primaryColor }]}
            onPress={handleTermsOfService}
          >
            <Ionicons name="document-text-outline" size={24} color="white" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Terms of Service</Text>
              <Text style={styles.settingSubtext}>Read our terms and conditions</Text> 
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}