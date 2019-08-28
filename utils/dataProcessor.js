/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
'use strict'
const data = require('../mock')
const sunActivity = data.map(el => el.radioActivity)

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

const higher = getHigher(sunActivity)
const lower = getLower(sunActivity)

function mapToRange (val, in_min, in_max, out_min, out_max) {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
const range = sunActivity.map(el => mapToRange(el, lower, higher, 0, 100))
