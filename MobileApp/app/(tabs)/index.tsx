import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // --- كود الـ JS بتاعك بالضبط ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true); // ده بديل الـ toggleIcon
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  // دالة الـ Form Submit بتاعتك بالحرف
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Login successful!");
        console.log("Token:", data.token);
      } else {
        Alert.alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Server connection error:", error);
      Alert.alert("Could not connect to the server.");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* --- Left Panel --- */}
          <View style={styles.leftPanel}>
            <View style={styles.brandHeader}>
              <View style={styles.logoBox}>
                <Ionicons name="calendar" size={20} color="#1a5e4d" />
              </View>
              <Text style={styles.h1}>UniSchedule</Text>
            </View>
            <Text style={styles.brandDesc}>
              An advanced Timetable Generator that eliminates scheduling
              conflicts and intelligently optimizes your academic experience.
            </Text>

            <View style={styles.featureTags}>
              <View style={styles.tag}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color="rgba(255, 255, 255, 0.9)"
                />
                <Text style={styles.tagText}>Conflict-Free</Text>
              </View>
              <View style={styles.tag}>
                <Ionicons
                  name="sync"
                  size={14}
                  color="rgba(255, 255, 255, 0.9)"
                />
                <Text style={styles.tagText}>Real-Time Sync</Text>
              </View>
              <View style={styles.tag}>
                <Ionicons
                  name="bulb-outline"
                  size={14}
                  color="rgba(255, 255, 255, 0.9)"
                />
                <Text style={styles.tagText}>Smart Suggestions</Text>
              </View>
            </View>
          </View>

          {/* --- Right Panel --- */}
          <View style={styles.rightPanel}>
            <View style={styles.loginHeader}>
              <Text style={styles.h2}>Welcome back</Text>
              <Text style={styles.loginP}>
                Sign in to your account to access your timetable and manage your
                schedule.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@university.edu"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelWithLink}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setSecureText(!secureText)} // دالة إظهار وإخفاء الباسورد
                >
                  <Ionicons
                    name={secureText ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.keepSignedIn}
              onPress={() => setKeepSignedIn(!keepSignedIn)}
            >
              <Ionicons
                name={keepSignedIn ? "checkbox" : "square-outline"}
                size={20}
                color="#1a5e4d"
              />
              <Text style={styles.keepLabel}>Keep me signed in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
              <Text style={styles.signInBtnText}>Sign In →</Text>
            </TouchableOpacity>

            <Text style={styles.requestAccess}>
              Don't have an account?{" "}
              <Text style={styles.linkText}>Request Access</Text>
            </Text>
            <Text style={styles.termsText}>
              By signing in, you agree to our{" "}
              <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- كود الـ CSS بتاعك متحول لـ StyleSheet ---
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#1a5e4d" },
  leftPanel: {
    backgroundColor: "#1a5e4d",
    padding: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brandHeader: { flexDirection: "row", alignItems: "center", gap: 15 },
  logoBox: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: { color: "white", fontSize: 26, fontWeight: "bold" },
  brandDesc: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 20,
    lineHeight: 24,
  },
  featureTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 30,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: { color: "rgba(255, 255, 255, 0.9)", fontSize: 12 },
  rightPanel: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    padding: 30,
  },
  loginHeader: { marginBottom: 30 },
  h2: { fontSize: 28, fontWeight: "700", color: "#33", marginBottom: 10 },
  loginP: { color: "#666", fontSize: 15, lineHeight: 22 },
  inputGroup: { marginBottom: 22 },
  labelWithLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 8 },
  forgotPassword: { fontSize: 12, color: "#1a5e4d", fontWeight: "500" },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  passwordWrapper: { justifyContent: "center" },
  passwordToggle: { position: "absolute", right: 15 },
  keepSignedIn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  keepLabel: { fontSize: 14, color: "#333" },
  signInBtn: {
    backgroundColor: "#1a5e4d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signInBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
  requestAccess: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  linkText: { color: "#1a5e4d", fontWeight: "600" },
  termsText: {
    textAlign: "center",
    fontSize: 11,
    color: "#666",
    marginTop: 30,
  },
});
