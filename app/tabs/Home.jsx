import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";

import * as Location from "expo-location";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [text, setText] = useState("Esperando permissão...");

  useEffect(() => {
    const buscarLocalizacao = async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada...");
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({});

      setLocation(location);
    };

    buscarLocalizacao();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      setText(errorMsg);
    } else if (location) {
      setText(JSON.stringify(location));
    }
  }, [location, errorMsg]);

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default Home;
