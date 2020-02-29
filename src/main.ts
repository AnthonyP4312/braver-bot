import { Client, Constants, Message } from 'discord.js'
import log from 'loglevel'
import config from './config'
import dispatch from './dispatch'
log.setDefaultLevel(0)

export const client = new Client()
const Events = Constants.Events

client.on(Events.CLIENT_READY, () => {
  log.info(`Logged in as ${client.user?.tag}`)
})

client.on(Events.MESSAGE_CREATE, msg => {
  log.debug(`Recieved a message: ${msg.content}`)

  // Typecast here is acceptable as we have to specifically
  // allow partial messages
  dispatch(msg as Message)
})


client.login(config.token)
