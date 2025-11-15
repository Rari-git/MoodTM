import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

export default function Profile() {
  const mood = useMood((state) => state.currentMood);
  const bgColors = moodColors[mood].background;

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("users");
      const users: StoredUser[] = stored ? JSON.parse(stored) : [];

      const loggedEmail = await AsyncStorage.getItem("loggedEmail");

      if (!loggedEmail) return;

      const found = users.find((u) => u.email === loggedEmail);
      if (found) setCurrentUser(found);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("loggedEmail");
    await AsyncStorage.removeItem("autoLogin");
    router.replace("/(auth)/login");
  };

  const handlePasswordChange = async () => {
    if (!oldPass || !newPass || !confirmNewPass) {
      setMessage("All fields are required.");
      return;
    }

    if (!currentUser) {
      setMessage("User not found.");
      return;
    }

    if (oldPass !== currentUser.password) {
      setMessage("Old password is incorrect.");
      return;
    }

    if (newPass.length < 3) {
      setMessage("New password must be at least 3 characters.");
      return;
    }

    if (newPass !== confirmNewPass) {
      setMessage("New passwords do not match.");
      return;
    }

    const stored = await AsyncStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const updatedUsers = users.map((u) => {
      if (u.email === currentUser.email) {
        return { ...u, password: newPass };
      }
      return u;
    });

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser({ ...currentUser, password: newPass }); // Update local state

    setMessage("Password changed successfully!");
    setTimeout(() => {
      setShowPasswordModal(false);
      setOldPass("");
      setNewPass("");
      setConfirmNewPass("");
      setMessage("");
    }, 1200);
  };

  return (
    <LinearGradient colors={bgColors} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, marginTop: 50 }}>
        
        {/* PROFILE HEADER */}
        <View style={{ alignItems: "center", gap: 12, marginBottom: 32 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />

          <ThemedText style={{ fontSize: 32, fontWeight: "bold" }}>
            Your Profile
          </ThemedText>

          {/* ADAUGAT: Afișare informații utilizator */}
          {currentUser && (
            <View style={{ alignItems: "center", gap: 4 }}>
              <ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
                {currentUser.name}
              </ThemedText>
              <ThemedText style={{ fontSize: 14, opacity: 0.8 }}>
                {currentUser.email}
              </ThemedText>
            </View>
          )}

          <ThemedText>View your info and preferences</ThemedText>
        </View>

        {/* OPTIONS */}
        <View style={{ gap: 16 }}>
          {/* Change Password */}
          <TouchableOpacity
            onPress={() => setShowPasswordModal(true)}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18 }}>Change Password</ThemedText>
          </TouchableOpacity>

          {/* Change Mood */}
          <TouchableOpacity
            onPress={() => router.push("/mood?from=profile")}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18 }}>Change Mood</ThemedText>
          </TouchableOpacity>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "rgba(255, 100, 100, 0.3)",
              padding: 16,
              borderRadius: 14,
              marginTop: 20,
            }}
          >
            <ThemedText style={{ fontSize: 18, color: "#ff6b6b" }}>
              Logout
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* PASSWORD MODAL */}
        {showPasswordModal && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 16,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
                Change Password
              </Text>

              <TextInput
                placeholder="Old Password"
                secureTextEntry
                value={oldPass}
                onChangeText={setOldPass}
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 12,
                }}
              />

              <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 12,
                }}
              />

              <TextInput
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmNewPass}
                onChangeText={setConfirmNewPass}
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 12,
                }}
              />

              {message.length > 0 && (
                <Text
                  style={{
                    color: message.includes("success") ? "green" : "red",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {message}
                </Text>
              )}

              <TouchableOpacity
                onPress={handlePasswordChange}
                style={{
                  backgroundColor: "#4c84ff",
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                  Save Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowPasswordModal(false);
                  setMessage("");
                }}
              >
                <Text style={{ textAlign: "center", color: "#333" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}