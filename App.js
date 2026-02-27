import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function App() {

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [corResultado, setCorResultado] = useState("white");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) return null;

  function calcularIMC() {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a) {
      setResultado("Preencha os campos");
      setCorResultado("orange");
      return;
    }

    const imc = p / (a * a);
    const valor = imc.toFixed(2);

    if (imc < 18.5) {
      setResultado(`IMC ${valor} - Magreza`);
      setCorResultado("#4da6ff");
    }
    else if (imc < 25 ) {
      setResultado(`IMC ${valor} - Normal`);
      setCorResultado("#00e676");
    }
    else if (imc < 30) {
      setResultado(`IMC ${valor} - Sobrepeso`);
      setCorResultado("#ffd600");
    }
    else {
      setResultado(`IMC ${valor} - Obesidade`);
      setCorResultado("#ff5252");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.calculoBox}>

        <Text style={styles.titulo}>Calcule seu IMC</Text>
        <StatusBar style="light" />

        <TextInput
          placeholder="Informe o peso (kg)"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          placeholder="Informe a altura (m)"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <Pressable
          onPress={calcularIMC}
          style={({ pressed }) => [
            styles.botao,
            { transform: [{ scale: pressed ? 0.95 : 1 }] }
          ]}
        >
          <Text style={styles.botaoTexto}>Calcular</Text>
        </Pressable>

        {resultado && (
          <Text style={[styles.resultado, { color: corResultado }]}>
            {resultado}
          </Text>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calculoBox: {
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    width: 290,
    elevation: 12
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    marginBottom: 20,
    color: "white"
  },

  input: {
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#1c1c1c",
    width: 230,
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontFamily: "Poppins_400Regular",
    color: "white",
  },

  botao: {
    backgroundColor: "#9b34fc",
    paddingVertical: 14,
    width: 230,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5
  },

  botaoTexto: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 16
  },

  resultado: {
    marginTop: 20,
    fontFamily: "Poppins_700Bold",
    fontSize: 18
  }
});