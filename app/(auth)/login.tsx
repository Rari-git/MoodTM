import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type StoredUser = {
  name: string; // username
  email: string;
  password: string;
};

const passwordRegex = /^.{2,}$/; // minim 2 caractere

export default function Login() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const tapAnim = useRef(new Animated.Value(1)).current;
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(tapAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(tapAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const handleConnect = async () => {
    setLoginError("");
    setPasswordError("");

    if (!username || !password) {
      setLoginError("Completează username și parola!");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("Parola trebuie să aibă minim 2 caractere.");
      return;
    }

    const stored = await AsyncStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const existing = users.find(
      (u) => u.name.toLowerCase() === username.toLowerCase()
    );

    if (!existing || existing.password !== password) {
      setLoginError("Username sau parolă greșite.");
      return;
    }

    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("loggedEmail", existing.email); // CORECTAT: Folosim email, nu username

    if (rememberMe) {
      await AsyncStorage.setItem("autoLogin", "true");
    } else {
      await AsyncStorage.removeItem("autoLogin");
    }

    router.replace("/(tabs)/home");
  };

  const inputInnerStyle = {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    outlineWidth: 0,
    paddingVertical: 0,
  } as const;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={["#6A85FF", "#94B5FF"]} style={{ flex: 1, padding: 20 }}>
        {/* LOGO */}
        <View style={{ alignItems: "center", marginTop: 60, marginBottom: 10 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Ionicons name="happy-outline" size={40} color="#fff" />
          </View>
          <Text style={{ color: "#fff", fontSize: 26, fontWeight: "600" }}>MoodTM</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 24,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 12,
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
                color: "#333",
              }}
            >
              Welcome back 👋
            </Text>

            {/* USERNAME */}
            <View
              style={{
                borderWidth: 2,
                borderColor: isUsernameFocused ? "#000" : "#d0d4df",
                borderRadius: 12,
                backgroundColor: "#f8f9ff",
                height: 54,
                justifyContent: "center",
                paddingHorizontal: 14,
                marginBottom: 18,
              }}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
                autoCapitalize="none"
                style={inputInnerStyle}
              />
            </View>

            {/* PASSWORD */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 2,
                borderColor: passwordError ? "red" : isPassFocused ? "#000" : "#d0d4df",
                borderRadius: 12,
                backgroundColor: "#f8f9ff",
                height: 54,
                paddingHorizontal: 14,
                marginBottom: 4,
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPass}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (value.length > 0 && !passwordRegex.test(value)) {
                    setPasswordError("Parola trebuie să aibă minim 2 caractere.");
                  } else {
                    setPasswordError("");
                  }
                }}
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
                style={inputInnerStyle}
              />

              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? "eye-off" : "eye"} size={24} color="#777" />
              </TouchableOpacity>
            </View>
            {passwordError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                  fontSize: 14,
                }}
              >
                {passwordError}
              </Text>
            )}

            {/* FORGOT PASSWORD */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot")}
              style={{ marginBottom: 12 }}
            >
              <Text style={{ color: "#4c84ff", textAlign: "right" }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* REMEMBER ME */}
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name={rememberMe ? "checkbox" : "square-outline"}
                size={22}
                color="#4c84ff"
              />
              <Text style={{ marginLeft: 6, color: "#444" }}>Keep me logged in</Text>
            </TouchableOpacity>

            {/* BUTTON */}
            <Animated.View style={{ transform: [{ scale: tapAnim }] }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  animateButton();
                  await handleConnect();
                }}
                style={{
                  backgroundColor: "#4c84ff",
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Connect
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* ERROR LOGIN */}
            {loginError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {loginError}
              </Text>
            )}

            {/* REGISTER LINK */}
            <View
              style={{ flexDirection: "row", justifyContent: "center", marginTop: 18 }}
            >
              <Text style={{ fontSize: 14, color: "#777" }}>Don't have an account? </Text>
              <Link
                href="/(auth)/register"
                style={{ fontSize: 14, color: "#4c84ff", fontWeight: "600" }}
              >
                Create one
              </Link>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}