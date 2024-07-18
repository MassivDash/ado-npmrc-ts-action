/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import { Args } from '../src/libs/args'
import fs from 'fs'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>

const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation()

const args: Args = {
  AZURE_PASSWORD: 'password',
  AZURE_REGISTRY_NAME: 'registry',
  AZURE_ORGANIZATION: 'organization',
  AZURE_EMAIL: 'email',
  AZURE_USERNAME: 'username'
}

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
  })

  it('should run the action', async () => {
    getInputMock.mockImplementation(name => {
      const value = args[name as keyof Args]
      return (value !== undefined ? value : '').toString()
    })

    await main.run()

    expect(runMock).toHaveBeenCalled()
    expect(debugMock).toHaveBeenCalledWith('Args parsed')
    expect(debugMock).toHaveBeenCalledWith('Content generated')
    expect(debugMock).toHaveBeenCalledWith('File written')
    expect(writeFileSyncMock).toHaveBeenCalled()
  })

  it('should fail if an error occurs', async () => {
    getInputMock.mockImplementation(() => '')

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith(
      'Input required and not supplied: AZURE_PASSWORD'
    )
  })
})
