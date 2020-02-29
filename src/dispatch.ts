import commands from './commands'
import { Message } from 'discord.js'

export const enum TextCommands {
  PING,
  PLAY,
  MOVIENIGHT,
  STOP,
  SKIP
}

export const enum ReactionCommands {
  UPLOAD,
  DELETE
}

export default function (msg: Message) {
  commands.play(msg)
}
