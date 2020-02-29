import ytdl from 'ytdl-core'
import {Message} from "discord.js"
import log from 'loglevel'

export async function playYoutube(msg: Message): Promise<void> {
  const conn = await msg.member?.voice.channel?.join()
  if (conn) {
    log.debug(`playing ${msg.content} from youtube`)
    conn.play(ytdl(msg.content, { filter: 'audioonly' }))
  }
}
