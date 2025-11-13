import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { router } from "expo-router"; // ✅ import router

export default function TabTwoScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let valid = true;
    setUsernameError("");
    setPasswordError("");

    if (!username.trim()) {
      setUsernameError("Please enter username");
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError("Please enter password");
      valid = false;
    }

    if (valid) {
      console.log("Login Success");
      router.push("/Success"); // ✅ navigate to converter page
    }
  };

  const handleSignup = () => {
    router.push("/explore"); // ✅ navigate to signup page
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("@/assets/images/newbg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Ionicons name="cash-outline" size={90} color="#ffd700" style={styles.icon} />

          <ThemedText
            type="title"
            style={[styles.title, { fontFamily: Fonts.rounded }]}
          >
             Login
          </ThemedText>
          <Text style={styles.subtitle}>Access your converter calculator</Text>

          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (text.trim()) setUsernameError("");
            }}
          />
          {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.trim()) setPasswordError("");
            }}
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Don’t have an account?{" "}
            <Text style={styles.linkText} onPress={handleSignup}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  container: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  icon: { marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "700", color: "#fff", marginBottom: 6 },
  subtitle: { color: "#eee", marginBottom: 25, fontSize: 15 },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  button: {
    width: "100%",
    backgroundColor: "#ffd700",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#ffd700",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: { color: "#333", fontWeight: "600", fontSize: 17 },
  error: { color: "#ffd700", marginBottom: 10 },
  footer: { marginTop: 25, color: "#fff" },
  linkText: { color: "#ffd700", fontWeight: "bold" },
});
