import { Animated, Easing } from "react-native";

/**
 * Create a fade-in animation
 */
export const createFadeInAnimation = (duration = 300) => {
  const fadeAnim = new Animated.Value(0);
  
  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { fadeAnim, startAnimation };
};

/**
 * Create a scale animation
 */
export const createScaleAnimation = (duration = 200) => {
  const scaleAnim = new Animated.Value(0.8);
  
  const startAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { scaleAnim, startAnimation };
};

/**
 * Create a slide-up animation
 */
export const createSlideUpAnimation = (duration = 300) => {
  const slideAnim = new Animated.Value(100);
  
  const startAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return { slideAnim, startAnimation };
};

/**
 * Create a press feedback animation
 */
export const createPressAnimation = () => {
  const scaleAnim = new Animated.Value(1);
  
  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return { scaleAnim, onPressIn, onPressOut };
};
