import { useEffect } from 'react';
import { Platform } from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-android-navbar';

export const useHideAndroidNavBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      hideNavigationBar();
    }
  }, []);
};

export const useShowAndroidNavBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      showNavigationBar();
    }
  }, []);
};