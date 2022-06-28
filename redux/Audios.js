import { createSlice } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import { useEffect } from "react";

const initialState = {
  currentImgIndex: 0,
  currentAsset: undefined,
  allAssets: undefined,
  currentAssetIndex: 0,
  active: false,
  Sound: undefined,
  playSound: {},
  pauseSound: {},
  // currentAsset: {
  //   albumId: 0,
  //   creationTime: 0,
  //   duration: 2.868,
  //   filename: "Безмятежность.ogg",
  //   height: 0,
  //   id: "18910",
  //   mediaType: "audio",
  //   modificationTime: 1626900459000,
  //   uri: "file:///storage/emulated/0/Android/media/com.google.android.gm/Notifications/Calm/Безмятежность.ogg",
  //   width: 0,
  // },
};

export const audioSlice = createSlice({
  name: "audioAssets",
  initialState,
  reducers: {
    setCurrentAsset: (state, action) => {
      state.currentAsset = action.payload;
    },
    setCurrentImgIndex: (state) => {
      const randomIndex = Math.floor(Math.random() * (4 - 0)) + 0;
      state.currentImgIndex = randomIndex;
    },

    setAllAssets: (state, action) => {
      state.allAssets = action.payload;
    },
    setCurrentAssetIndex: (state, action) => {
      state.currentAssetIndex = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    SetSound: (state, action) => {
      state.Sound = action.payload;
    },
    setPlaySound: async (state) => {
      const { sound } = await Audio.Sound.createAsync({
        uri: currentAsset.uri,
      });
      state.playSound = sound;
    },
    setPauseSound: async (state) => {
      const { sound } = await Audio.Sound.createAsync({
        uri: currentAsset.uri,
      });
      state.pauseSound = sound;
    },
  },
});

export const {
  setCurrentAsset,
  setCurrentImgIndex,
  setAllAssets,
  setCurrentAssetIndex,
  setActive,
  SetSound,
} = audioSlice.actions;
export const selectAudioSlice = (state) => state.audioSlice;

export default audioSlice.reducer;
