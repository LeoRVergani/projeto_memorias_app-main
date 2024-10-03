import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function MemoriasDoPassado() {

  const [name, setName] = useState('')
  const [image, setImage] = useState('')


  async function getImageLibrary() {
    const imageInLibrary = await ImagePicker.launchImageLibraryAsync()

    if (imageInLibrary?.assets) {
      setImage(imageInLibrary.assets[0].uri)
    }
  }

  async function getImageCamera() {
    const imageInCamera = await ImagePicker.launchCameraAsync()

    if (imageInCamera?.assets) {
      setImage(imageInCamera.assets[0].uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {
        image && <Image style={styles.image} source={{ uri: image }} width={150} height={150} />
      }

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TouchableHighlight
        underlayColor="#e596dd"
        style={styles.imageButton}
        onPress={getImageLibrary}
      >
        <Text>Escolher imagem</Text>
      </TouchableHighlight>


      <TouchableHighlight
        underlayColor="#e596dd"
        style={styles.imageButton}
        onPress={getImageCamera}
      >
        <Text>Abrir camera</Text>
      </TouchableHighlight>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#f216dc',
    height: 32,
    padding: 5
  },
  imageButton: {
    backgroundColor: '#f216dc',
    height: 32,
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  image: {
    alignSelf: 'center',
    marginVertical: 10
  }
});