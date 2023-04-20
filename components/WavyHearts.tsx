import React, { useEffect } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

interface WavyEmojiProps {
  source: ImageSourcePropType;
  startPositionX: number;
  onAnimationComplete: () => void;
}

const WavyEmoji: React.FC<WavyEmojiProps> = ({
  source,
  startPositionX,
  onAnimationComplete,
}) => {
  const position = new Animated.ValueXY({ x: startPositionX, y: windowHeight });
  const opacity = new Animated.Value(1);

  const getRandomOffset = () => {
    return Math.random() * 30 - 15;
  };

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        // Animated.timing(position.x, {
        //   toValue: position.x.value() + getRandomOffset(),
        //   duration: 3000,
        //   easing: Easing.ease,
        //   useNativeDriver: true,
        // }),
        Animated.timing(position.y, {
          toValue: -windowHeight,
          duration: 3000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete();
      });
    };

    const id = position.y.addListener(({ value }) => {
      if (value <= -windowHeight) {
        position.y.removeListener(id);
        onAnimationComplete();
      }
    });

    startAnimation();

    return () => {
      position.y.removeListener(id);
    };
  }, []);

  return (
    <Animated.Image
      source={source}
      style={[
        {
          position: 'absolute',
          width: 40,
          height: 40,
          bottom: 0,
          opacity,
        },
        position.getLayout(),
      ]}
    />
  );
};

export default WavyEmoji;
