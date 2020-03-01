import ytdl from 'ytdl-core'
import { Message } from 'discord.js'
import log from 'loglevel'
import { createReadStream, promises as fs } from 'fs'
import { withConn } from '../../util/voice'

export function playYoutube(msg: Message): void {
  withConn(msg, conn => {
    log.debug(`playing ${msg.content} from youtube`)
    conn.play(ytdl(msg.content, { filter: 'audioonly' }))
  })
}

export async function playLocal(msg: Message): Promise<void> {
  const file = msg.content
  // The absolute fucking state of node development when i have to
  // catch an error to just see if a file exists jesus christ give
  // me a bool you monsters
  try {
    // Check that the sound exists first
    const filepath = `/sounds/${file}`
    await fs.stat(filepath)

    withConn(msg, conn => {
      log.debug(`playing local file ${msg.content}`)
      // TODO will need to add handling for other file types
      // conn.play(createReadStream(`/sounds/${msg.content}`), {
      //   type: 'ogg/opus',
      // })
      conn.play(filepath)
    })
  } catch (e) {
    if (e.code === 'ENOENT')
      msg.reply(`Couldn't find that file: ${msg.content}`)
    else console.error(e)
  }
}
