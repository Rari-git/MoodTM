import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { moodConfig } from '../constants/moods';
import styles from '../constants/styles';
import { useMood } from '../contexts/MoodContext';

export default function HomeScreen() {
  const { mood } = useMood();
  const router = useRouter();
  const currentMood = mood ? moodConfig[mood] : null; 

  // Funcția de schimbare a stării acum navighează 
  const handleChangeMood = () => {
    router.push('/moodSelect'); // Navighează la ecranul de selecție
  };

  return (
    <ImageBackground 
      source={currentMood?.background} 
      style={styles.bgImage}
    >
      <View style={styles.sceneContent}>
        {/* Header  */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome to MoodTM</Text>
          <Text style={styles.subtitle}>Your daily mood companion</Text>
        </View>

        {/* Butoane  */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionBtn, { backgroundColor: currentMood?.primaryColor }]} 
            onPress={handleChangeMood} 
          >
            <Ionicons name="swap-horizontal" size={24} color="white" />
            <Text style={styles.actionText}>Change Mood</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: currentMood?.primaryColor }]}> 
            <Ionicons name="bulb-outline" size={24} color="white" />
            <Text style={styles.actionText}>What should I do today?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: currentMood?.primaryColor }]}> 
            <Ionicons name="restaurant-outline" size={24} color="white" />
            <Text style={styles.actionText}>Where should I eat today?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: currentMood?.primaryColor }]}> 
            <Ionicons name="location-outline" size={24} color="white" />
            <Text style={styles.actionText}>What should I visit today?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}