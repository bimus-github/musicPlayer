import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectAudioSlice, setActive, SetSound } from "../redux/Audios";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const images = [
  require("../assets/images/music.jpg"),
  require("../assets/images/muslim.jpg"),
  require("../assets/images/muslims.jpg"),
  require("../assets/images/quran.jpg"),
];

export default function Player() {
  const dispatch = useDispatch();
  const {
    currentAsset,
    currentImgIndex,
    allAssets,
    currentAssetIndex,
    active,
    Sound,
  } = useSelector(selectAudioSlice);
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [sound, setSound] = useState(Sound);
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState(null);
  const [playObj, setPlayObj] = useState(null);

  useEffect(() => {
    setCount(currentAsset?.duration || 0);
  }, [currentAsset]);

  // useEffect(() => {
  //   let interval = null;

  //   if (active && count > 0) {
  //     interval = setInterval(() => {
  //       setCount((count) => count - 1);
  //     }, 1000);
  //   }

  //   if (active && count < 0) {
  //     setCount(0);
  //     clearInterval(interval);
  //     dispatch(setActive(!active));
  //     return getRemaining;
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [active, count, setActive()]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onPaus = async (audio) => {
    setPlay(!play);
    // console.warn(status);

    if (!play && status === null) {
      const playObj = await Audio.Sound.createAsync(
        {
          uri: audio.uri,
        },
        {
          shouldPlay: true,
        }
      );
      await playObj.playAsync();
      setPlayObj(...playObj, playObj);
      console.log(status);
      setStatus(status);
      console.warn("play");
    }
    if (play && status.isLoaded && status.isPlaying) {
      await playObj.pauseAsync();
      console.warn("pause");
      console.log(status);
    }

    let interval = null;

    if (!play && count > 0) {
      interval = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }

    if (play) {
      setCount(0);
      clearInterval(interval);
      // dispatch(setActive(!active));
      setPlay(!play);
      return getRemaining;
    }
  };

  const format = (number) => `0${number}`.slice(-2);

  const getRemaining = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time - min * 60);
    return { min: format(min), sec: format(sec) };
  };
  const { min, sec } = getRemaining(count);

  // useEffect(() => {}, [onPaus()]);
  return (
    <View style={styles.contanier}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="dots-vertical" size={30} color="black" />
        <Text style={{ marginRight: 15 }}>
          {currentAssetIndex}/{allAssets.length}
        </Text>
      </View>
      <View style={styles.filename}>
        <Image
          source={images[currentImgIndex]}
          style={{ width: 350, height: 480 }}
        />
        <Text
          style={{
            marginTop: 10,
            width: "95%",
          }}
        >
          {currentAsset?.filename || "Tanlanmagan"}
        </Text>
      </View>
      <View style={styles.likes}>
        <MaterialCommunityIcons
          name="playlist-music"
          onPress={() => {
            navigation.navigate("PlayList");
            console.log("hello");
          }}
          size={24}
          color="black"
        />
        <MaterialCommunityIcons
          name="heart-multiple-outline"
          size={24}
          color="black"
        />
        <AntDesign name="plus" size={24} color="black" />
      </View>
      <View style={styles.time}>
        <Slider
          style={{
            left: -5,
            width: "99%",
            height: 15,
            position: "absolute",
          }}
          minimumValue={0}
          maximumValue={currentAsset?.duration || 1}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#009"
          value={count}
        />
        <Text style={{ paddingTop: 15, paddingRight: 15 }}>
          {min}:{sec}
          {/* {time1} */}
        </Text>
      </View>
      <View style={styles.pause}>
        <Entypo name="controller-jump-to-start" size={24} color="black" />
        <Entypo
          onPress={() => onPaus(currentAsset)}
          name={play ? "controller-paus" : "controller-play"}
          size={24}
          color="black"
        />
        <Entypo name="controller-next" size={24} color="black" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contanier: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    top: 40,
  },
  filename: {
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },
  likes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  time: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  pause: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
  },
});
