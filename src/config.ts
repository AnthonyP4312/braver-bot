import {safeLoad} from 'js-yaml'

export interface Config {
  token: string
}

const config: Config = safeLoad('config.yml')

export default config
