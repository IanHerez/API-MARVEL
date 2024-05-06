import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import MD5 from 'crypto-js/md5';


import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';


export default function App() {

const PublicKey ="8750227269ca7f6110a2101c5d10c5dd";
const PrivateKey = "37208348e4e52b95586b4fbf0019d45a6a5b55fd";
const ts = new Date().getTime().toString();

const strAux = ts+PrivateKey+PublicKey
const strhash = MD5(strAux);

console.log(strhash);

const urlServidorMarvel="https://gateway.marvel.com/v1/public"
const strApiKey = `ts=${ts}&apikey=${PublicKey}&hash=${strhash}`
const urlPersonajes = urlServidorMarvel + "/comics?" + strApiKey;

console.log(urlPersonajes);


interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const url = "https://gateway.marvel.com/v1/public/comics?ts=1714755591343&apikey=8750227269ca7f6110a2101c5d10c5dd&hash=72a3d6fc1318630decfbc807c9889110";

const consultarAPI = async () => {
  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const comics: Comic[] = data.data.results;

    comics.forEach(comic => {
      console.log("Nombre del cómic:", comic.title);
      console.log("Imagen:", comic.thumbnail.path + "/standard_xlarge." + comic.thumbnail.extension);
      console.log("--------------------------------------------");
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

consultarAPI();



  return (
    
      <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.paragraph}>
      </Text>
     </View>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

