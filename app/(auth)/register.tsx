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

const usernameRegex = /^.{4,}$/; // minim 4 caractere
const passwordRegex = /^.{2,}$/; // minim 2 caractere (momentan)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const [nameError, setNameError] = useState("");
  const [passLengthError, setPassLengthError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    if (!usernameRegex.test(name)) {
      setNameError("Username trebuie să aibă minim 4 caractere.");
      setGeneralError("Te rog corectează username-ul.");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Introdu un email valid.");
      setGeneralError("Te rog corectează email-ul.");
      return;
    }

    if (!passwordRegex.test(pass)) {
      setPassLengthError("Parola trebuie să aibă minim 2 caractere.");
      setGeneralError("Te rog corectează parola.");
      return;
    }

    if (pass !== confirmPass) {
      setPasswordError("Parolele nu sunt la fel.");
      setGeneralError("Te rog corectează parolele.");
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

    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("autoLogin");

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
          {/* USERNAME */}
          <View
            style={{
              borderWidth: 2,
              borderColor: nameError ? "red" : fName ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              justifyContent: "center",
              paddingHorizontal: 14,
              marginBottom: 4,
            }}
          >
            <TextInput
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={(value) => {
                setName(value);
                if (value.length > 0 && !usernameRegex.test(value)) {
                  setNameError("Username trebuie să aibă minim 4 caractere.");
                } else {
                  setNameError("");
                }
              }}
              onFocus={() => setFName(true)}
              onBlur={() => setFName(false)}
              autoCapitalize="none"
              style={{
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />
          </View>
          {nameError.length > 0 && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
              {nameError}
            </Text>
          )}

          {/* EMAIL */}
          <View
            style={{
              borderWidth: 2,
              borderColor: emailError ? "red" : fEmail ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              justifyContent: "center",
              paddingHorizontal: 14,
              marginBottom: 4,
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (value.length > 0 && !emailRegex.test(value)) {
                  setEmailError("Introdu un email valid.");
                } else {
                  setEmailError("");
                }
              }}
              onFocus={() => setFEmail(true)}
              onBlur={() => setFEmail(false)}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                fontSize: 16,
                borderWidth: 0,
                outlineWidth: 0,
              }}
            />
          </View>
          {emailError.length > 0 && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
              {emailError}
            </Text>
          )}

          {/* PASSWORD */}
          <View
            style={{
              borderWidth: 2,
              borderColor:
                passwordError || passLengthError ? "red" : fPass ? "#000" : "#d0d4df",
              borderRadius: 12,
              backgroundColor: "#f8f9ff",
              height: 54,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPass}
              value={pass}
              onChangeText={(value) => {
                setPass(value);

                if (value.length > 0 && !passwordRegex.test(value)) {
                  setPassLengthError("Parola trebuie să aibă minim 2 caractere.");
                } else {
                  setPassLengthError("");
                }

                if (confirmPass.length > 0 && value !== confirmPass) {
                  setPasswordError("Parolele nu sunt la fel.");
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
          {passLengthError.length > 0 && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
              {passLengthError}
            </Text>
          )}

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
                  setPasswordError("Parolele nu sunt la fel.");
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
                marginTop: 8,
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
