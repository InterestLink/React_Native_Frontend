import * as React from "react";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import PostCard from "../subcomponents/PostCard";
import StyleExample from "../styles/StyleExample";

export default function Home({ navigation }) {
  const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const posts = [
    {
      id: "1",
      username: "chief keef",
      content: "All these damn frenemies, I'm gon' call up PooPoo Man",
      image: "https://example.com/image1.jpg",
    },
    {
      id: "2",
      username: "user2",
      content: "#kony2012",
    },
  ];

  /*const fetchHelloWorld = async () => {
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
  }*/

  return (
    <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard {...item} />}
        />
      </View>
  );
}
