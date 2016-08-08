import * as _ from 'lodash'
import { COLOR_ARRAY, Color, CharColor } from './utils'
const CueSDK = require('cue-sdk-node') // Import the Node CUE SDK

const cue = new CueSDK.CueSDK() // Get CUE Instance

interface CueOptions {
  maxChars?: number
  charDelay?: number
  defaultColor?: Color
}

/**
 * CueNode
 */
export default class CueMessage {
  options: CueOptions
  messageStack: string[]
  charStack: CharColor[]
  constructor({ maxChars = 5, charDelay = 1000, defaultColor = Color.WHITE }: CueOptions = {}) {
    this.options = { maxChars, charDelay, defaultColor }
    this.charStack = []
  }
  addMessage(message: string) {
    this.clearMessage()
    return new Promise((resolve, reject) => {
      const messageChars = message.split('')
      messageChars.forEach((char, index) => {
        setTimeout(() => {
          this.addCharacter(char)
          this.updateKeyboard()
          // Check if we have finished the last character of this message
          if (index === messageChars.length - 1) {
            resolve() // return promise
          }
        }, (index + 1) * this.options.charDelay) // tslint:disable-line
      })
    })
    // TODO Create message
  }
  clearMessage() {
    this.charStack = []
    cue.clear()
  }
  addCharacter(char: string) {
    let colorChoice = this.options.defaultColor // Default Key Color
    const index = _.findIndex(this.charStack, { char }) // attempt to find index of char
    if (index >= 0) {
      this.charStack.splice(index, 1)
      colorChoice = Color.RED
    }
    if (this.charStack.length >= this.options.maxChars) {
      this.charStack.shift()
    }
    this.charStack.push({ char, color: colorChoice })
  }
  updateKeyboard() {
    const keys = this.charStack.map((charColor) => {
      const character = charColor.char === ' ' ? 'SPACE' : charColor.char // CORSAIR Key ID mapping
      return [character, ...COLOR_ARRAY[charColor.color]] // e.g. ['A', 255, 255, 255]
    })
    // console.log(keys)
    cue.clear()
    cue.set(keys)
  }
}
