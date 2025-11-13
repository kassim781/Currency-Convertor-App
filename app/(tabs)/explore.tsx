import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email : any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = () => {
    if (!username || !email || !password || !qualification || !phone || !dob || !gender) {
      setError("⚠️ Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }
    if (phone.length < 10) {
      setError("⚠️ Please enter a valid phone number");
      return;
    }
    setError("");
    router.push("/Success");
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dob;
    setShowPicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const genderOptions = ["Male", "Female", "Others"];

  return (
    <ImageBackground
      source={require("@/assets/images/newbg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* ✅ KeyboardAvoidingView added */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>📝 Sign Up</Text>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              placeholderTextColor="#ccc"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Qualification */}
          <View style={styles.inputContainer}>
            <Ionicons name="school-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Qualification"
              placeholderTextColor="#ccc"
              value={qualification}
              onChangeText={setQualification}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Ionicons name="calendar-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Select Date of Birth"
              placeholderTextColor="#ccc"
              value={dob.toDateString()}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <Ionicons name="chevron-down" size={22} color="#FFD700" style={styles.iconRight} />
            </TouchableOpacity>
          </View>
          {showPicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          {/* Gender */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <Ionicons name="male-female-outline" size={22} color="#FFD700" style={styles.icon} />
              <Text style={[styles.input, { color: gender ? "#fff" : "#ccc" }]}>
                {gender || "Select Gender"}
              </Text>
              <Ionicons
                name={showGenderDropdown ? "chevron-up" : "chevron-down"}
                size={22}
                color="#FFD700"
                style={styles.iconRight}
              />
            </TouchableOpacity>

            {showGenderDropdown && (
              <View style={styles.fullDropdown}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setGender(option);
                      setShowGenderDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#FFD700"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },

 
  container: {
  flexGrow: 0,
  marginTop: "17%",         
  marginHorizontal: 25,
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: 18,
  paddingVertical: 19,    
  paddingHorizontal: 10,
  alignItems: "center",
  justifyContent: "flex-start",  
  width: "85%",
  alignSelf: "center",
},


  title: {
    fontSize: 22,      
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,  
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "85%",      
    marginBottom: 12,
    paddingHorizontal: 10,
    height: 46,     
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,       
    paddingVertical: 6,
  },
    fullDropdown: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,0.9)",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 14,
    overflow: "hidden",
    alignSelf: "center",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  dropdownText: {
    color: "#FFD700",
    fontSize: 16.5,
  },


  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12, 
    borderRadius: 10,
    width: "85%",       
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "#000", fontWeight: "bold", fontSize: 18 },
  link: { color: "#FFD700", marginTop: 15, fontSize: 16 },
  error: { color: "red", fontWeight: "600", marginBottom: 10 },
});
