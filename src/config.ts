import {safeLoad} from 'js-yaml'
import {readFileSync} from 'fs'
import * as log from 'loglevel'

export interface Config {
  token: string,
  loglevel: log.LogLevelDesc
}

const config: Config = safeLoad(readFileSync('config.yml', {encoding: 'utf-8'}))

log.setLevel(config.loglevel)

export default config
