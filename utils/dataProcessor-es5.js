/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

// const marsActivity = data.map(el => el.radioActivity)

/**
 * Take all data sun activity and compute average, higher and lower getLower
 */

function getAverage (data) {
  return data.reduce((acc, curr) => (acc += curr), 0) / data.length
}
function getHigher (data) {
  return data.reduce((acc, curr) => (acc > curr ? acc : curr))
}
function getLower (data) {
  return data.reduce((acc, curr) => (acc < curr ? acc : curr))
}

/**
 * Range values from 0 to 100
 */

module.exports = function mapToRange (val, data, out_min, out_max) {
  return ((val - Math.min(...data)) * (out_max - out_min)) / (Math.max(...data) - Math.min(...data)) + out_min
}
