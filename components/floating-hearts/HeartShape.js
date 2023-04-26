import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

/**
 * @function HeartShape
 */

const HeartShape = ({ color }) => {
  return <Image source={require('./heart.png')} style={{ tintColor: color }} />;
};

HeartShape.propTypes = {
  color: PropTypes.string,
};

HeartShape.defaultProps = {
  color: '#f82d87',
};

function getRandomColor() {
  const red = getRandomNumber(100, 144);
  const green = getRandomNumber(10, 200);
  const blue = getRandomNumber(200, 244);
  return `rgb(${red}, ${green}, ${blue})`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Exports
 */

export default HeartShape;
