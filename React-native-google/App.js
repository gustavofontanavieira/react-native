import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import {CSS} from "./assets/CSS/Css.js";

/* imports de idependênias baixadas */
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect( ()=>{

    /* o async function com o useEffect faz com que ao iniciar o App, a localização do usuário seja pega */
    (async function(){

      /* o requestForegroundPermissionsAsync() é uma função do Location que pergunta pro usuário se permite pegar sua localizaçao */
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* estrutura de decisão para deixar o código rolar caso o usuário permita sua localização */
        if (status === 'granted') {
          //criação da variável que salva a localização do usuário, dentro da função getCurrentPosition 
          //temos o enableHighAccuracy que faz a localização pega do usuário seja mais exata
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

            //setamos então ao Origin a real localização do usuário para que então consiga conversar com a constante origin
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            })
        } else {
            throw new Error('Location permission not granted');
        }

    })();
  });

  return (
    <View style={CSS.container}>
      <MapView style={CSS.map} initialRegion={origin} showsUserLocation={true}>

    </MapView>

      <View style={CSS.search}> 
        <Text style={CSS.letras}>CONSEGUI KRAI</Text>
      </View>
    </View>
  );
}


