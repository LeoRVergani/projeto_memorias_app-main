import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';

import axios from 'axios'

import * as ImagePicker from 'expo-image-picker';

export default function MemoriasDoPassado() {

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [type, setType] = useState('')
  const [fileName, setFileName] = useState('')


  async function getImageLibrary() {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permission.granted) {
      const imageInLibrary = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        orderedSelection: true,
        // allowsMultipleSelection: true
      })

      if (imageInLibrary?.assets) {
        setImage(imageInLibrary.assets[0].uri)
        setType(imageInLibrary.assets[0].mimeType as string)
        setFileName(imageInLibrary.assets[0].fileName as string)
      }

    }
  }

  async function getImageCamera() {

    const permission = await ImagePicker.requestCameraPermissionsAsync()

    if (permission.granted) {
      const imageInCamera = await ImagePicker.launchCameraAsync()

      if (imageInCamera?.assets) {
        setImage(imageInCamera.assets[0].uri)
        setType(imageInCamera.assets[0].mimeType as string)
        setFileName(imageInCamera.assets[0].fileName as string)
      }
    }

  }

  function saveMemory() {
    /* http://192.168.0.37:3000/images */

    if (!name || !image) {
      console.log("preencha a imagem")
    } else {

      const dados = new FormData()
      dados.append('name', name)
      dados.append('image', {
        uri: image,
        name: fileName,
        type: type
      })

      axios.post('http://192.168.100.11:3000/upload', dados, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(() => {
          console.log("DEU BOM NO UPLOAD")
        })
        .catch((error) => {
          console.log(error)
          console.log("DEU RUIM NO UPLOAD")
        })
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


      <TouchableHighlight
        underlayColor="#79066d"
        style={styles.imageButton}
        onPress={saveMemory}
      >
        <Text>Cadastrar memoria</Text>
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
