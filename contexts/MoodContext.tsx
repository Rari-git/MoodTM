// contexts/MoodContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset'; // <-- AM ADĂUGAT IMPORTUL PENTRU 'Asset'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MoodType, moodConfig } from '../constants/moods'; // <-- AM ADĂUGAT 'moodConfig'

interface MoodContextProps {
  mood: MoodType;
  selectMood: (mood: string) => Promise<void>;
  isLoading: boolean;
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [mood, setMood] = useState<MoodType>(null);
  const [isLoading, setIsLoading] = useState(true);

  // AICI ESTE MODIFICAREA PRINCIPALĂ
  useEffect(() => {
    (async () => {
      try {
        // 1. Creăm lista de imagini (la fel ca înainte)
        const imagesToLoad = [
          require('../assets/images/background/backgroundChangeMood.png'),
          ...Object.values(moodConfig).map(config => config.background)
        ];

        // 2. Creăm promisiunea DOAR pentru imagini
        const loadAssetsPromise = Asset.loadAsync(imagesToLoad);

        // 3. Așteptăm DOAR imaginile
        await loadAssetsPromise;

        // 4. Am ȘTERS logica pentru 'loadStoragePromise' și 'savedMood'

      } catch (e) {
        console.error("Failed to load assets.", e); // Mesaj de eroare actualizat
      } finally {
        // 5. Oprim încărcarea
        setIsLoading(false);
      }
    })();
  }, []); // [] asigură că rulează o singură dată

  // Funcția de salvare a stării (rămâne neschimbată)
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

// Hook-ul personalizat (rămâne neschimbat)
export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};