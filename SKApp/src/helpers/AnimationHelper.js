import { getInputRangeFromIndexes } from "react-native-snap-carousel";

function scrollInterpolator(index, carouselProps) {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
}

function animatedStyles(index, animatedValue, carouselProps) {
  let animatedOpacity = {};
  let animatedTransform = {};
  let translateVal = Math.round((carouselProps.sliderWidth * 0.3) / 4);

  if (carouselProps.inactiveSlideOpacity < 1) {
    animatedOpacity = {
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [
          carouselProps.inactiveSlideOpacity,
          1,
          carouselProps.inactiveSlideOpacity,
        ],
      }),
    };
  }

  if (carouselProps.inactiveSlideScale < 1) {
    animatedTransform = {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              carouselProps.inactiveSlideScale,
              1,
              carouselProps.inactiveSlideScale,
            ],
          }),
          translateY: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              -translateVal * carouselProps.inactiveSlideShift,
              0,
              -translateVal * carouselProps.inactiveSlideShift,
            ],
          }),
          translateX: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              translateVal * carouselProps.inactiveSlideScale,
              0,
              -translateVal * carouselProps.inactiveSlideScale,
            ],
          }),
        },
      ],
    };
  }

  return {
    ...animatedOpacity,
    ...animatedTransform,
  };
}

export default { scrollInterpolator, animatedStyles };
