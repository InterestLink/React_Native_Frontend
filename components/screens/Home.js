import * as React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import StyleExample from "../styles/StyleExample";

export default function Home({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHelloWorld = async () => {
    try {
      const response = await fetch(
        "https://y5pyf47rw4.execute-api.us-east-2.amazonaws.com/dev/helloWorld"
      );
      const jsonResponse = await response.json();
      setData(jsonResponse);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchHelloWorld();
  }, []);
  console.log(data);

  if (loading) {
    return (
      <View style={StyleExample.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={StyleExample.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={StyleExample.container}>
      {data ? <Text>{data.body}</Text> : <Text>No message received</Text>}
    </View>
  );
}
