import { DMChannel, NewsChannel, TextChannel } from 'discord.js'
import log from 'loglevel'

/**
 * Given a channel and a thunk'd promise, pretend to be typing in that channel while the action is performed
 */
export default async function whileTyping(
  channel: TextChannel | DMChannel | NewsChannel,
  promise: () => Promise<unknown>,
) {
  try {
    channel.startTyping()
    const result = await promise()
    return result
  } catch (e) {
    log.error(e)
    return channel.send('Something went wrong.').catch(console.error)
  } finally {
    channel.stopTyping()
  }
}
