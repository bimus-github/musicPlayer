import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrari from "expo-media-library";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setCurrentAsset,
  setCurrentImgIndex,
  setAllAssets,
  setCurrentAssetIndex,
  setActive,
  selectAudioSlice,
  SetSound,
} from "../redux/Audios";
import { useSelector } from "react-redux";

export default function PlayList() {
  const dispatch = useDispatch();
  const { active, Sound } = useSelector(selectAudioSlice);
  const navigation = useNavigation();
  const [play, setPlay] = useState(active);
  const [audioAssets, setAudioAssets] = useState([]);
  const [sound, setSound] = useState(Sound);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function onPlay(asset, index) {
    // setPlay(!play);

    dispatch(setActive(play));
    // if (!play) {
    navigation.jumpTo("Player");
    dispatch(setCurrentAsset(asset));
    dispatch(setCurrentImgIndex());
    dispatch(setCurrentAssetIndex(index));
    //   const { sound } = await Audio.Sound.createAsync({
    //     uri: asset.uri,
    //   });
    //   dispatch(SetSound(setSound(...sound, sound)));
    //   await sound.pauseAsync();
    // } else {
    //   navigation.jumpTo("Player");
    //   const { sound } = await Audio.Sound.createAsync({
    //     uri: asset.uri,
    //   });
    //   await sound.playAsync();
    //   dispatch(SetSound(setSound(...sound, sound)));
    //   setPlay(!play);
    // }
  }

  useEffect(() => {
    const requestPermissions = async () => {
      const result1 = await MediaLibrari.requestPermissionsAsync();
      if (!result1.granted) {
        Alert.alert("you must press ok");
      } else {
        const result = await MediaLibrari.getAssetsAsync({
          mediaType: "audio",
        });
        setAudioAssets(result.assets);

        dispatch(setAllAssets(result.assets));
        return result;
      }
    };
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 25 }}>Ho'jeyn Musics</Text>
      </View>
      <ScrollView style={styles.musics}>
        {audioAssets.map((asset, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={styles.music}
              onPress={() => onPlay(asset, index)}
            >
              <MaterialCommunityIcons
                name="music-box-outline"
                size={30}
                color="black"
              />
              <Text style={styles.filename}>{asset.filename}</Text>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  musics: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "90%",
  },
  music: {
    margin: 10,
    borderBottomColor: "darkgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filename: {
    color: "black",
    width: "85%",
    fontSize: 15,
  },
});
