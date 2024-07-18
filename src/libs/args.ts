import * as core from '@actions/core'

export interface Args {
  AZURE_PASSWORD: string
  AZURE_REGISTRY_NAME: string
  AZURE_ORGANIZATION: string
  AZURE_PROJECT?: string
  AZURE_USERNAME: string
  AZURE_EMAIL: string
  AZURE_REGISTRY_SCOPE?: string
  AZURE_ENCODE_PASSWORD?: boolean | string
}

export function parseArgs(): Args {
  // Check for required inputs
  // required list: AZURE_PASSWORD, AZURE_REGISTRY_NAME, AZURE_ORGANIZATION, AZURE_EMAIL

  const required = [
    'AZURE_PASSWORD',
    'AZURE_REGISTRY_NAME',
    'AZURE_ORGANIZATION',
    'AZURE_EMAIL'
  ]
  for (const input of required) {
    if (!core.getInput(input) || core.getInput(input) === '') {
      throw new Error(`Input required and not supplied: ${input}`)
    }
  }

  const AZURE_PASSWORD = core.getInput('AZURE_PASSWORD')
  const AZURE_REGISTRY_NAME = core.getInput('AZURE_REGISTRY_NAME')
  const AZURE_ORGANIZATION = core.getInput('AZURE_ORGANIZATION')
  const AZURE_PROJECT = core.getInput('AZURE_PROJECT')
  const AZURE_USERNAME = core.getInput('AZURE_USERNAME')
  const AZURE_EMAIL = core.getInput('AZURE_EMAIL')
  const AZURE_REGISTRY_SCOPE = core.getInput('AZURE_REGISTRY_SCOPE')
  const AZURE_ENCODE_PASSWORD = core.getInput('AZURE_ENCODE_PASSWORD')

  const args = {
    AZURE_PASSWORD,
    AZURE_REGISTRY_NAME,
    AZURE_ORGANIZATION,
    AZURE_PROJECT,
    AZURE_USERNAME,
    AZURE_EMAIL,
    AZURE_REGISTRY_SCOPE,
    AZURE_ENCODE_PASSWORD
  }

  console.log(args)

  return args
}
