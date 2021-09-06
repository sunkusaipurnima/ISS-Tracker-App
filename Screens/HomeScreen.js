/** @format */

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}>
        <ImageBackground
          source={require("../assets/bg_image.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>ISS Tracker</Text>
          </View>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              navigation.navigate("ISSLocation");
            }}
          >
            <Text style={styles.routeText}>ISSLocation</Text>
            <Text style={styles.knowMore}>{"Know More ---->"}</Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image
              source={require("../assets/iss_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              navigation.navigate("Meteor");
            }}
          >
            <Text style={styles.routeText}>Meteor</Text>
            <Text style={styles.knowMore}>{"Know More ---->"}</Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image
              source={require("../assets/meteor_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              navigation.navigate("Updates");
            }}
          >
            <Text style={styles.routeText}>Updates</Text>
            <Text style={styles.knowMore}>{"Know More ---->"}</Text>
            <Text style={styles.bgDigit}>3</Text>
            <Image
              source={require("../assets/rocket_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    flex: 1,
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
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "white",
  },
  routeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginTop: 75,
    paddingLeft: 30,
  },
  knowMore: {
    color: "red",
    paddingLeft: 30,
    fontSize: 15,
  },
  bgDigit: {
    position: "absolute",
    color: "rgba(183, 183, 183, 0.5)",
    fontSize: 150,
    right: 10,
    bottom: -8,
    zIndex: -1,
  },
  iconImage: {
    position: "absolute",
    width: 200,
    height: 200,
    resizeMode: "contain",
    right: 20,
    top: -80,
  },
});

export default HomeScreen;
