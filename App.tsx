import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, Image } from 'react-native';
import MD5 from 'crypto-js/md5';

const PublicKey = "8750227269ca7f6110a2101c5d10c5dd";
const PrivateKey = "37208348e4e52b95586b4fbf0019d45a6a5b55fd";

const urlServidorMarvel = "https://gateway.marvel.com/v1/public";
const ts = new Date().getTime().toString();
const strAux = ts + PrivateKey + PublicKey;
const strhash = MD5(strAux).toString();
const strApiKey = `ts=${ts}&apikey=${PublicKey}&hash=${strhash}`;
const urlPersonajes = `${urlServidorMarvel}/comics?${strApiKey}`;

interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const App = () => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const respuesta = await fetch(urlPersonajes);
        const data = await respuesta.json();
        const comicsData: Comic[] = data.data.results;
        setComics(comicsData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    consultarAPI();
  }, []);

  const renderComic = ({ item }: { item: Comic }) => (
    <View style={styles.comicContainer}>
      <Image
        source={{ uri: `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}` }}
        style={styles.comicImage}
      />
      <Text style={styles.comicTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comics}
        renderItem={renderComic}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.comicsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  comicsList: {
    padding: 8,
  },
  comicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  comicImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  comicTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 8,
  },
});

export default App;
