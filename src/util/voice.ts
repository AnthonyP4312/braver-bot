import { Message, VoiceConnection } from "discord.js";
import log from "loglevel";

/**
 * Given a Message, perform a callback on a connection to the author's voice channel.
 */
export function withConn(msg: Message, callback: (conn: VoiceConnection) => void): void {
  const conn = msg.member?.voice.channel?.join()

  if (conn) {
    conn.then(callback)
  } else {
    log.error(`Couldn't acquire voice connection for ${msg.content} from ${msg.author.username}`)
  }
}
