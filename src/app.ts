const vorpal = require('vorpal')()
import CueMessage from './cue'

const cueMessage = new CueMessage()

vorpal
  .command('msg <message...>', `Sends Message to Server "".`)
  .action((args) => {
    return new Promise((resolve, reject) => {
      const { message } = args
      const messageString = message.join(' ')
      const cuePromise = cueMessage.addMessage(messageString)
      vorpal.activeCommand.log('Printing message...')
      cuePromise.then(() => resolve())
    })
  })

vorpal
  .delimiter('cue-node$')
  .show()
