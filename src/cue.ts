const CueSDK = require('cue-sdk-node') // Import the Node CUE SDK
const cue = new CueSDK.CueSDK() // Get CUE Instance

// Options for Cue Messages
interface CueOptions {
  maxChars?: number
  charDelay?: number
}
//
const COLOR_ARRAY = [
  [255, 255, 255], // WHITE
  [255, 0, 0], // RED
  [0, 255, 0], // GREEN
  [0, 0, 255], // BLUE
]
enum Color {
  WHITE,
  RED,
  GREEN,
  BLUE,
}

interface CharColor {
  char: string
  color: Color
}

/**
 * CueNode
 */
export default class CueMessage {
  options: CueOptions
  messageStack: string[]
  charStack: CharColor[]
  constructor({ maxChars = 5, charDelay = 2000 }: CueOptions = {}) {
    this.options = { maxChars, charDelay }
    this.charStack = []
  }
  addMessage(message: string) {
    return new Promise((resolve, reject) => {
      const messageChars = message.split('');
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
  addCharacter(char: string) {
     if (this.charStack.length >= this.options.maxChars) {
       this.charStack.shift()
     }
     this.charStack.push({ char, color: Color.WHITE });
  }
  updateKeyboard() {
    const keys = this.charStack.map((charColor) => [charColor.char, ...COLOR_ARRAY[charColor.color]])
    console.log(keys)
    cue.clear();
    cue.set(keys)
  }
}
