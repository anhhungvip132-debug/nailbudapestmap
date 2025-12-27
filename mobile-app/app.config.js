export default {
  expo: {
    name: "NailBudapestMap",
    slug: "nailbudapestmap",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    assetBundlePatterns: ["**/*"],

    plugins: [
      "expo-asset" // 🔴 BẮT BUỘC – nếu thiếu Metro sẽ lỗi
    ],

    ios: {
      supportsTablet: false,
    },

    android: {
      package: "com.nailbudapest.map",

      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },

      config: {
        googleMaps: {
          apiKey: "AIzaSyCn-9Jj-wuum5E5Gn3lsNr__vJRBfckpwE"
        }
      }
    },

    web: {
      bundler: "metro",
    },
  },
};
