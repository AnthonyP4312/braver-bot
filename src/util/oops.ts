import log from 'loglevel'
import { Message } from 'discord.js'

export default function oops(msg: Message, ...content: unknown[]) {
  const now = Date.now()
  msg.reply(`Something went wrong - ${now}`).catch(log.error)
  log.error(now, ...content)
}
