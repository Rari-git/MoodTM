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

export default function Register() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

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
    ]).start();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [fName, setFName] = useState(false);
  const [fEmail, setFEmail] = useState(false);
  const [fPass, setFPass] = useState(false);
  const [fConf, setFConf] = useState(false);

  const handleRegister = async () => {
    setGeneralError("");

    if (!name || !email || !pass || !confirmPass) {
      setGeneralError("Te rog completează toate câmpurile.");
      return;
    }

    if (passwordError) {
      setGeneralError("Parolele nu sunt la fel.");
      return;
    }

    const stored = await AsyncStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const existing = users.find((u: StoredUser) => u.email === email);

    if (existing) {
      setGeneralError("Acest email este deja înregistrat.");
      return;
    }

    const newUser: StoredUser = {
      name,
      email,
      password: pass,
    };

    users.push(newUser);

    await AsyncStorage.setItem("users", JSON.stringify(users));

    // NU îl logăm automat, îl trimitem la login
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={["#6A85FF", "#94B5FF"]} style={{ flex: 1, padding: 20 }}>
        
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
            <Ionicons name="person-add-outline" size={40} color="#fff" />
          </View>
          <Text style={{ color: "#fff", fontSize: 26, fontWeight: "600" }}>
            Create Account
          </Text>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
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

          {/* NAME */}
          <View
            style={{
              borderWidth: 2,
              borderColor: fName ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              justifyContent: "center",
              paddingHorizontal: 14,
              marginBottom: 16,
            }}
          >
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
              onFocus={() => setFName(true)}
              onBlur={() => setFName(false)}
              style={{
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />
          </View>

          {/* EMAIL */}
          <View
            style={{
              borderWidth: 2,
              borderColor: fEmail ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              justifyContent: "center",
              paddingHorizontal: 14,
              marginBottom: 16,
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFEmail(true)}
              onBlur={() => setFEmail(false)}
              autoCapitalize="none"
              style={{
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />
          </View>

          {/* PASSWORD */}
          <View
            style={{
              borderWidth: 2,
              borderColor: passwordError ? "red" : fPass ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPass}
              value={pass}
              onChangeText={(value) => {
                setPass(value);

                if (confirmPass.length > 0 && value !== confirmPass) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
              onFocus={() => setFPass(true)}
              onBlur={() => setFPass(false)}
              style={{
                flex: 1,
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />

            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons
                name={showPass ? "eye-off" : "eye"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASS */}
          <View
            style={{
              borderWidth: 2,
              borderColor: passwordError ? "red" : fConf ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPass}
              value={confirmPass}
              onChangeText={(value) => {
                setConfirmPass(value);

                if (pass !== value) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
              onFocus={() => setFConf(true)}
              onBlur={() => setFConf(false)}
              style={{
                flex: 1,
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />

            <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
              <Ionicons
                name={showConfirmPass ? "eye-off" : "eye"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {passwordError.length > 0 && (
            <Text style={{ color: "red", marginTop: 8, fontSize: 14 }}>
              {passwordError}
            </Text>
          )}

          {generalError.length > 0 && (
            <Text
              style={{
                color: "red",
                marginTop: 4,
                marginBottom: 8,
                fontSize: 14,
              }}
            >
              {generalError}
            </Text>
          )}

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: "#4c84ff",
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 8,
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
              Create Account
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 18,
            }}
          >
            <Text style={{ fontSize: 14, color: "#777" }}>
              Already have an account?{" "}
            </Text>

            <Link
              href="/(auth)/login"
              style={{
                fontSize: 14,
                color: "#4c84ff",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          </View>

        </Animated.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
