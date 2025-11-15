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
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  // ANIMATIONS
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

  // FORM STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  // FOCUS STATE
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  // BUTTON ANIMATION
  const tapAnim = useRef(new Animated.Value(1)).current;
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(tapAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(tapAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  // LOGIN LOGIC
  const handleConnect = async () => {
    setLoginError("");

    if (!email || !password) {
      setLoginError("Complete email and password!");
      return;
    }

    const stored = await AsyncStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const existing = users.find((u: StoredUser) => u.email === email);

    if (!existing || existing.password !== password) {
      setLoginError("Email sau parolă greșite.");
      return;
    }

    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("loggedEmail", email);
    router.replace("/(main)");
  };

  // style folosit pentru interiorul inputurilor
  const inputInnerStyle = {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    outlineWidth: 0,
    paddingVertical: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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

            {/* EMAIL */}
            <View
              style={{
                borderWidth: 2,
                borderColor: isEmailFocused ? "#000" : "#d0d4df",
                borderRadius: 12,
                backgroundColor: "#f8f9ff",
                height: 54,
                justifyContent: "center",
                paddingHorizontal: 14,
                marginBottom: 18,
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                keyboardType="email-address"
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
                borderColor: isPassFocused ? "#000" : "#d0d4df",
                borderRadius: 12,
                backgroundColor: "#f8f9ff",
                height: 54,
                paddingHorizontal: 14,
                marginBottom: 18,
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
                style={inputInnerStyle}
              />

              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? "eye-off" : "eye"} size={24} color="#777" />
              </TouchableOpacity>
            </View>

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

            {/* ERROR */}
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
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 18 }}>
              <Text style={{ fontSize: 14, color: "#777" }}>Don’t have an account? </Text>
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
