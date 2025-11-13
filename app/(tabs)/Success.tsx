import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CurrencyConverter() {
  type Currency = "INR" | "USD" | "EUR" | "AED" | "SAR" | "LKR";

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<Currency>("INR");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<string | null>(null);

  // Static exchange rates (for demo)
  const rates: Record<Currency, number> = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    AED: 0.044,
    SAR: 0.045,
    LKR: 3.84,
  };

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult("⚠️ Please enter a valid amount");
      return;
    }

    const inINR = parseFloat(amount) / rates[fromCurrency];
    const converted = inINR * rates[toCurrency];
    setResult(`${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/newbg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>💱 Currency Converter</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>From</Text>
          <Picker
            selectedValue={fromCurrency}
            onValueChange={(val: Currency) => setFromCurrency(val)}
            style={styles.picker}
            dropdownIconColor="#FFD700"
          >
            <Picker.Item label="🇮🇳 INR - Indian Rupee" value="INR" />
            <Picker.Item label="🇺🇸 USD - Dollar" value="USD" />
            <Picker.Item label="🇪🇺 EUR - Euro" value="EUR" />
            <Picker.Item label="🇦🇪 AED - Dirham" value="AED" />
            <Picker.Item label="🇸🇦 SAR - Riyal" value="SAR" />
            <Picker.Item label="🇱🇰 LKR - Sri Lankan Rupee" value="LKR" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>To</Text>
          <Picker
            selectedValue={toCurrency}
            onValueChange={(val: Currency) => setToCurrency(val)}
            style={styles.picker}
            dropdownIconColor="#FFD700"
          >
            <Picker.Item label="🇮🇳 INR - Indian Rupee" value="INR" />
            <Picker.Item label="🇺🇸 USD - Dollar" value="USD" />
            <Picker.Item label="🇪🇺 EUR - Euro" value="EUR" />
            <Picker.Item label="🇦🇪 AED - Dirham" value="AED" />
            <Picker.Item label="🇸🇦 SAR - Riyal" value="SAR" />
            <Picker.Item label="🇱🇰 LKR - Sri Lankan Rupee" value="LKR" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={convertCurrency}>
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>

        {result && <Text style={styles.result}>{result}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 25,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  pickerContainer: {
    width: "90%",
    marginBottom: 15,
  },
  label: {
    color: "#FFD700",
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
  },
  picker: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  result: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    textAlign: "center",
  },
});
