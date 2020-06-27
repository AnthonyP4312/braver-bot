import log from 'loglevel'
import { last, initial } from 'lodash'
import { Message, MessageAttachment } from 'discord.js'
import { insert } from '../db/Sound'
import oops from '../util/oops'

/**
 * Adds a given sound to the database
 */
export default async function addSound(msg: Message, params: string[]) {
  const [name, uri] = getMetadata(msg, params)
  const serverId = msg.guild?.id
  if (!serverId) return oops(msg, 'No server Id on message')

  try {
    await insert(name, serverId, uri)
    msg.reply(`Added \`${name}\``).catch(log.error)
  } catch (e) {
    if (e.constraint === 'nameserveriduniq') {
      msg.reply(`Name \`${name}\` is already taken.`).catch(log.error)
    } else {
      oops(msg, e)
    }
  }
}

function getMetadata(msg: Message, params: string[]): [string, string] {
  if (msg.attachments.size !== 0) {
    const file = msg.attachments.first() as MessageAttachment
    return [params.join(' '), file.url]
  }

  const name = initial(params).join(' ')
  const uri = last(params)
  if (!uri) {
    throw "Couldn't derive uri for sound"
  }

  return [name, uri]
}
