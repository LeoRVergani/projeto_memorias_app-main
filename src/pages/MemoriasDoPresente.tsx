import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState, useRef } from 'react';
import React from 'react';

export default function MemoriasDoPresente() {

  const [typeCamera, setTypeCamera] = useState<CameraType>('front')
  const [myPhoto, setMyPhoto] = useState('')

  const cameraRef = useRef<CameraView>()

  function flipCamera() {
    if (typeCamera === "front") {
      setTypeCamera('back')
    } else {
      setTypeCamera('front')
    }
  }

  async function captureImage() {
    const myImage = await cameraRef.current?.takePictureAsync()

    if (myImage?.uri) {
      setMyPhoto(myImage?.uri)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {
        myPhoto === '' ?

          <CameraView
            style={styles.camera}
            facing={typeCamera}
            ref={cameraRef}
          >
            <View style={styles.footerCameraContainer}>

              <TouchableOpacity style={styles.buttonCapture} onPress={flipCamera}>
                <MaterialCommunityIcons
                  name='camera-flip'
                  color="red"
                  size={30}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonCapture} onPress={captureImage}>
                <MaterialCommunityIcons
                  name='camera'
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>

          </CameraView>
          : <View>
            <Image source={{ uri: myPhoto }} width={200} height={200} />
          </View>
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonCapture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerCameraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20
  }
});
