import commands from './commands'
import { Message } from 'discord.js'
import { client } from './main'

export const enum TextCommands {
  PING,
  PLAY,
  MOVIENIGHT,
  STOP,
  SKIP,
  SETVOLUME = "SETVOLUME"
}

export const enum ReactionCommands {
  UPLOAD,
  DELETE
}

export default function (msg: Message) {
  if (msg.content.startsWith(TextCommands.SETVOLUME)) {

  } else {
    commands.play(msg)
  }
}
