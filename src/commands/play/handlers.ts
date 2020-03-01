import ytdl from 'ytdl-core'
import { Message } from 'discord.js'
import log from 'loglevel'
import { createReadStream } from 'fs'
import { withConn } from '../../util/voice'

export function playYoutube(msg: Message): void {
  withConn(msg, conn => {
    log.debug(`playing ${msg.content} from youtube`)
    conn.play(ytdl(msg.content, { filter: 'audioonly' }))
  })
}

export async function playLocal(msg: Message): Promise<void> {
  withConn(msg, conn => {
    log.debug(`playing local file ${msg.content}`)
    // TODO will need to add handling for other file types
    // conn.play(createReadStream(`/sounds/${msg.content}`), {
    //   type: 'ogg/opus',
    // })
    const disp = conn.play(`/sounds/${msg.content}`)
    disp.on('debug', (m: any) => console.log('dispatcher: ', m))
    disp.on('end', () => console.log('file ended'))
    disp.on('error', console.error)
    log.debug(disp.volume)
  })
}
