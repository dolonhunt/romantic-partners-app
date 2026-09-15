import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thenext18.app',
  appName: 'The Next 18',
  webDir: 'dist',
  server: {
    // No backend needed - fully static
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0f0a0e',
      showSpinner: true,
      spinnerColor: '#d4a574',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f0a0e',
    },
  },
};

export default config;
