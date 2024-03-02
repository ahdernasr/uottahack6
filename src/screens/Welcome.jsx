import React from "react";
import { Button } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go to Ai" onPress={() => navigation.navigate("Ai")} />
      <Button
        title="Go to Voice"
        onPress={() => navigation.navigate("Voice")}
      />
    </>
  );
};

export default Welcome;
