import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MoodType, moodConfig } from '../constants/moods';

interface MoodContextProps {
  mood: MoodType;
  selectMood: (mood: string) => Promise<void>;
  isLoading: boolean;
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<MoodType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // 1. Creăm lista de imagini
        const imagesToLoad = [
          require('../assets/images/background/backgroundChangeMood.png'),
          ...Object.values(moodConfig).map(config => config.background)
        ];

        // 2. Creăm promisiunea pentru imagini
        const loadAssetsPromise = Asset.loadAsync(imagesToLoad);

        // 3. Creăm promisiunea pentru încărcarea stării salvate
        const loadStoragePromise = AsyncStorage.getItem("mood");

        // 4. Așteptăm AMBELE promisiuni
        const [savedMood] = await Promise.all([loadStoragePromise, loadAssetsPromise]);

        // 5. Setăm starea dacă există o stare salvată
        if (savedMood) {
          setMood(savedMood as MoodType);
        }

      } catch (e) {
        console.error("Failed to load assets or saved mood.", e);
      } finally {
        // 6. Oprim încărcarea
        setIsLoading(false);
      }
    })();
  }, []);

  const selectMood = async (selectedMood: string) => {
    try {
      await AsyncStorage.setItem("mood", selectedMood);
      setMood(selectedMood as MoodType);
    } catch (e) {
      console.error("Failed to save mood.", e);
    }
  };

  return (
    <MoodContext.Provider value={{ mood, selectMood, isLoading }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};