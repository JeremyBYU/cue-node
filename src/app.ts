const vorpal = require('vorpal')()
import CueMessage from './cue'


const cueMessage = new CueMessage()

vorpal
  .command('msg <message...>', `Sends Message to Server "".`)
  .action((args) => {
    return new Promise((resolve, reject) => {
      const { options, message } = args
      const messageString = message.join(' ')
      cueMessage.addMessage(messageString)
      vorpal.activeCommand.log('bar', options, message)
      resolve()
    })
  })

vorpal
  .delimiter('cue-node$')
  .show()
