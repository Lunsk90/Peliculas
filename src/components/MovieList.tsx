/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, Image} from 'react-native';
import axios from 'axios';
import {styles} from './styles/Peliculas.styles';

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

const Peliculas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=4cfc7abc&s=${searchQuery}`,
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View>
      <View style={styles.body}>
        <TextInput
          placeholder="Ingrese el título de la película"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.container}
        />
      </View>
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={item => item.imdbID}
        renderItem={({item}) => (
          <View>
            <Text>{item.Title}</Text>
            <Text>{item.Year}</Text>
            <Image
              source={{uri: item.Poster}}
              style={{width: 200, height: 300}}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Peliculas;
