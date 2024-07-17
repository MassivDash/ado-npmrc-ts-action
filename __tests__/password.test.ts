import { encodePassword } from '../src/libs/password'
import { Args } from '../src/libs/args'

const args: Args = {
  AZURE_PASSWORD: 'password',
  AZURE_REGISTRY_NAME: 'registry',
  AZURE_ORGANIZATION: 'organization',
  AZURE_EMAIL: 'email',
  AZURE_USERNAME: 'username'
}

describe('Password', () => {
  it('encodePassword should return base64 encoded password if AZURE_ENCODE_PASSWORD is true', () => {
    const testArgs = {
      AZURE_ENCODE_PASSWORD: 'true',
      ...args
    }
    expect(encodePassword(testArgs)).toEqual('cGFzc3dvcmQ=')
  })

  it('encodePassword should return password if AZURE_ENCODE_PASSWORD is false', () => {
    expect(encodePassword(args)).toEqual('password')
  })
})
