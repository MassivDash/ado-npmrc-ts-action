import { Args } from '../src/libs/args'
import { writeFile, generateWriteContent } from '../src/libs/write'
import fs from 'fs'

const args: Args = {
  AZURE_PASSWORD: 'password',
  AZURE_REGISTRY_NAME: 'registry_name',
  AZURE_ORGANIZATION: 'organization',
  AZURE_EMAIL: 'email',
  AZURE_USERNAME: 'username'
}

const noScopeRegistry = `registry=https://pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/`

const noScopeNpmrc = `${noScopeRegistry}
always-auth=true
; begin auth token
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:username=username
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:_password="password"
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:email=email
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:username=username
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:_password="password"
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:email=email
; end auth token`

const scopeRegistry = `@scope:registry=https://pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/`
const scopeNpmrc = `${scopeRegistry}
always-auth=true
; begin auth token
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:username=username
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:_password="password"
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/registry/:email=email
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:username=username
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:_password="password"
//pkgs.dev.azure.com/organization/_packaging/registry_name/npm/:email=email
; end auth token`

const projectRegistry = `registry=https://pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/registry/`
const projectNpmrc = `${projectRegistry}
always-auth=true
; begin auth token
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/registry/:username=username
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/registry/:_password="password"
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/registry/:email=email
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/:username=username
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/:_password="password"
//pkgs.dev.azure.com/organization/project/_packaging/registry_name/npm/:email=email
; end auth token`

const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation()

describe('Write', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('generateWriteContent should return registry and credentials', () => {
    expect(generateWriteContent(args)).toEqual(noScopeNpmrc)
  })

  it('generateWriteContent should return registry and credentials with scope', () => {
    const testArgs = {
      AZURE_REGISTRY_SCOPE: '@scope',
      ...args
    }
    expect(generateWriteContent(testArgs)).toEqual(scopeNpmrc)
  })

  it('generateWriteContent should return registry and credentials with project', () => {
    const testArgs = {
      AZURE_PROJECT: 'project',
      ...args
    }
    expect(generateWriteContent(testArgs)).toEqual(projectNpmrc)
  })

  it('writeFile should write content to file', () => {
    const content = generateWriteContent(args)
    writeFile(content)

    expect(writeFileSyncMock).toHaveBeenCalled()
  })
})
