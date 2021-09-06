/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import axios from "axios";

import API_KEY from "../config";

const MeteorScreen = (props) => {
  const [meteors, setMeteors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=" + API_KEY;
  console.log(Object.keys(meteors));
  // console.log(meteors);
  useEffect(() => {
    const getMeteors = async () => {
      axios
        .get(url)
        .then((response) => {
          //console.log(response.data.near_earth_objects);
          setMeteors(response.data.near_earth_objects);
        })
        .catch((error) => {
          Alert.alert(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getMeteors();
  }, []);

  const renderItem = ({ item }) => {
    let meteor = item;
    let bgImg, speed, size;
    if (meteor.threat_score <= 30) {
      bgImg = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bgImg = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bgImg = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (
      <View>
        <ImageBackground
          source={bgImg}
          style={{
            flex: 1,
            resizeMode: "cover",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <View style={styles.gifContainer}>
            <Image
              source={speed}
              style={{ width: size, height: size, alignSelf: "center" }}
            />
          </View>
          <Text style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}>
            {item.name}
          </Text>
          <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
            Closest to Earth -{" "}
            {item.close_approach_data[0].close_approach_date_full}
          </Text>
          <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
            Minimum Diameter (KM) -{" "}
            {item.estimated_diameter.kilometers.estimated_diameter_min}
          </Text>
          <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
            Maximum Diameter (KM) -{" "}
            {item.estimated_diameter.kilometers.estimated_diameter_max}
          </Text>
          <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
            Velocity (KM/H) -{" "}
            {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
          </Text>
          <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
            Missing Earth by (KM) -{" "}
            {item.close_approach_data[0].miss_distance.kilometers}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <Text> Getting Meteors Information ...</Text>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    );
  else {
    let meteor_arr = Object.keys(meteors).map((meteor_date) => {
      return meteors[meteor_date];
    });
    // console.log("meteor_arr", meteor_arr);
    let meteors_final = [].concat.apply([], meteor_arr);
    meteors_final.forEach(function (element) {
      let diameter =
        (element.estimated_diameter.kilometers.estimated_diameter_min +
          element.estimated_diameter.kilometers.estimated_diameter_max) /
        2;
      let threatScore =
        (diameter / element.close_approach_data[0].miss_distance.kilometers) *
        1000000000;
      element.threat_score = threatScore;
      console.log(threatScore);
    });

    meteors_final.sort((a, b) => {
      return b.threatScore - a.threatScore;
    });
    meteors_final.slice(0, 5);

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={meteors_final}
          horizontal={true}
          renderItem={renderItem}
        />
      </View>
    );
  }
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
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  meteorContainer: {
    flex: 0.85,
  },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
  },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MeteorScreen;
