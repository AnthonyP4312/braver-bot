import commands from './commands'
import { Message } from 'discord.js'
import { client } from './main'
import log from 'loglevel'

interface TextCommand {
  PING: 'PING'
  PLAY: 'PLAY'
  MOVIENIGHT: 'MOVIENIGHT'
  STOP: 'STOP'
  SKIP: 'SKIP'
  SETVOLUME: 'SETVOLUME'
  PLAYSOUND: 'PLAYSOUND'
}

export const TextCommandEnum: TextCommand = {
  PING: 'PING',
  PLAY: 'PLAY',
  MOVIENIGHT: 'MOVIENIGHT',
  STOP: 'STOP',
  SKIP: 'SKIP',
  SETVOLUME: 'SETVOLUME',
  PLAYSOUND: 'PLAYSOUND',
}

interface ReactionCommand {
  UPLOAD: 'UPLOAD'
  DELETE: 'DELETE'
}

export const ReactionCommandEnum: ReactionCommand = {
  UPLOAD: 'UPLOAD',
  DELETE: 'DELETE',
}

interface Command {
  name: keyof TextCommand | keyof ReactionCommand
  params: string[]
}

export const SOUND_PREFIX = '$'
export const COMMAND_PREFIX = '^'

export default function(msg: Message) {
  // if (msg.content.startsWith(TextCommandEnum.SETVOLUME)) {
  // } else {
  //   commands.play(msg)
  // }
  const command = parseCommand(msg)
  if (!command) return

  log.debug('Dispatching Command', command)
  switch (command.name) {
    case TextCommandEnum.PLAY:
      return commands.play(msg, command.params.join(' '))
  }
}

function parseCommand(msg: Message): Command | undefined {
  const prefix = msg.content[0]
  const name = msg.content.split(' ')[0].substring(1)
  const [, ...params] = msg.content.split(' ')

  switch (prefix) {
    case SOUND_PREFIX:
      return {
        name: TextCommandEnum.PLAY,
        params: [msg.content.substring(1)],
      }
    case COMMAND_PREFIX:
      // wtf typescript how is a string literal not a string, fuck you
      if (hasMember(TextCommandEnum as any, name)) {
        return { name: name as any, params }
      } else {
        msg.reply(`Invalid Command: ${name}`)
      }
    default:
    // non-prefix'd commands
  }
}

function hasMember(e: { [key: string]: string }, value: string) {
  return !!e[value]
}
