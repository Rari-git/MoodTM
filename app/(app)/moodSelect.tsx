import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { moodConfig, moodData } from '../../constants/moods';
import styles from '../../constants/styles';
import { useMood } from '../../contexts/MoodContext';

export default function MoodSelectScreen() {
  const { selectMood } = useMood();
  const router = useRouter();

  const handleSelect = async (moodKey: string) => {
    await selectMood(moodKey);
    if (router.canGoBack()) {
      router.back(); // Închide ecranul dacă a fost deschis peste tab-uri
    } else {
      router.replace('(tabs)' as any);
    }
  };

  return (
  // 1. Am schimbat <View> în <ImageBackground>
  <ImageBackground 
    // 2. Am adăugat calea corectă către imagine
    source={require('../../assets/images/background/backgroundChangeMood.png')}
    // 3. Am păstrat stilul original
    style={styles.moodScreen}
  >
    <StatusBar hidden /> 
    
    {/* 4. Am ȘTERS componenta <LinearGradient> care era aici */}

    {/* Conținutul ecranului rămâne exact la fel */}
    <View style={styles.moodContent}> 
      <Text style={styles.moodTitle}>How are you feeling today?</Text> 
      <Text style={styles.moodSubtitle}>Choose your current mood</Text> 
      
      <View style={styles.moodButtons}> 
        {moodData.map((moodItem) => (
          <TouchableOpacity
            key={moodItem.key}
            style={styles.moodBtn}
            onPress={() => handleSelect(moodItem.key)} 
          >
            <ImageBackground
              source={moodConfig[moodItem.key].background} 
              style={styles.moodBtnBackground}
              imageStyle={styles.moodBtnBackgroundImage}
            >
              <View style={styles.moodBtnContent}>
                <Text style={styles.moodEmoji}>{moodItem.emoji}</Text> 
                <Text style={styles.moodText}>{moodItem.label}</Text> 
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </ImageBackground>
);
}