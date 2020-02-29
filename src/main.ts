import { Client, Constants } from 'discord.js'
import * as log from 'loglevel'
import config from './config'

const client = new Client()
const Events = Constants.Events

client.on(Events.CLIENT_READY, () => {
  log.info(`Logged in as ${client.user.tag}`)
})

client.on(Events.MESSAGE_CREATE, msg => {
  log.debug(`Recieved a message: ${msg.content}`)
})

client.login(config.token)
