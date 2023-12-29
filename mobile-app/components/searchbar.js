import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.178.90:5000/search/${query}`);
        const data = await response.json();
        const sortedResults = data.sort((a, b) => a.id - b.id);
        setSearchResults(sortedResults);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    if (query.trim() !== '') {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleResultClick(item)}>
      <View>
        <Text style={{ fontSize: 18, margin: 5 }}>{item.title.replace('.mp3', '')}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleResultClick = (result) => {
    navigation.navigate('SongDetails', { title: result.title, artist: result.artist, id: result.id });
  };

  return (
    <View style={{ marginTop: 35, marginLeft: 10, marginRight: 10 }}>
      <TextInput
        placeholder="Search for a song..."
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={{ borderWidth: 2, borderRadius: 7, borderColor: 'black', padding: 10, fontSize: 20, marginBottom: 10 }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSearchResultItem}
      />
    </View>
  );
}; 

export default Searchbar;
