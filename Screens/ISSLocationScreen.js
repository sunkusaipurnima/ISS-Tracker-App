/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const ISSLocationScreen = (props) => {
  const [location, setLocation] = useState("");
  console.log(
    "Location Object",
    location.latitude,
    location.longitude,
    location
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getIssLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIssLocation = async () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        console.log(response.data, response.status);
        console.log(response.data.longitude, response.data.latitude);
        setLocation(response.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  if (location === "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <Text> Getting ISS Location Information ...</Text>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require("../assets/iss_bg.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>ISS Location</Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                pinColor="green"
              >
                <Image
                  source={require("../assets/iss_icon.png")}
                  style={{ height: 50, width: 50 }}
                />
              </Marker>
            </MapView>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Latitude: {location.latitude}</Text>
            <Text style={styles.infoText}>Longitude: {location.longitude}</Text>
            <Text style={styles.infoText}>
              Altitude (KM): {location.altitude}
            </Text>
            <Text style={styles.infoText}>
              Velocity (KM/H): {location.velocity}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  mapContainer: {
    flex: 0.7,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 0.15,
    backgroundColor: "white",
    marginTop: -10,

    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});

export default ISSLocationScreen;
