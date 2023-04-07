import React from "react";
import { StyleSheet, View } from "react-native";
import { Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const GradientMask = () => (
  <View style={StyleSheet.absoluteFillObject}>
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="grad" x1="50%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="transparent" stopOpacity="0" />
          <Stop offset="100%" stopColor="black" stopOpacity=".2" />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  </View>
);

export default GradientMask;