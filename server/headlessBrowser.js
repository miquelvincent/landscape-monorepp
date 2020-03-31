/* eslint-disable no-path-concat */
const puppeteer = require('puppeteer')

const open = async () => {
  // const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', headless: false, ignoreDefaultArgs: ['--mute-audio'], args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'] })
  const browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--mute-audio'], args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  await page.goto('http://localhost:1234')
}

open()
