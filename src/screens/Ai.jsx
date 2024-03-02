import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";

const chatGptEndpoint = "https://api.openai.com/v1/chat/completions";

const Ai = () => {
  async function run() {
    const client = axios.create({
      headers: {
        Authorization: "Bearer " + "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",
        "content-Type": "application/json",
      },
    });

    try {
      const res = await client.post(chatGptEndpoint, {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "State prime numbers between 1 and 20",
          },
        ],
      });
      console.log(res.data?.choices[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button title="Generate AI Text" onPress={run} />
    </View>
  );
};

export default Ai;
