import * as core from '@actions/core'
import { parseArgs } from '../src/libs/args'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

describe('Parse Args', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('parseArgs should throw error if required input is not provided', () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'AZURE_PASSWORD':
          return ''
        case 'AZURE_REGISTRY_NAME':
          return ''
        case 'AZURE_ORGANIZATION':
          return ''
        case 'AZURE_EMAIL':
          return ''
        default:
          return ''
      }
    })
    expect(() => parseArgs()).toThrow(
      'Input required and not supplied: AZURE_PASSWORD'
    )
  })

  it('parseArgs should return args object if required input is provided', () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'AZURE_PASSWORD':
          return 'password'
        case 'AZURE_REGISTRY_NAME':
          return 'registry'
        case 'AZURE_ORGANIZATION':
          return 'organization'
        case 'AZURE_EMAIL':
          return 'email'
        default:
          return ''
      }
    })
    expect(parseArgs()).toEqual({
      AZURE_PASSWORD: 'password',
      AZURE_REGISTRY_NAME: 'registry',
      AZURE_ORGANIZATION: 'organization',
      AZURE_PROJECT: '',
      AZURE_USERNAME: '',
      AZURE_EMAIL: 'email',
      AZURE_REGISTRY_SCOPE: '',
      AZURE_ENCODE_PASSWORD: ''
    })
  })
})
