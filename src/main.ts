import * as core from '@actions/core'
import { parseArgs, generateWriteContent, writeFile } from './libs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */

//inputs
// - AZURE_PASSWORD

//inputs
// - AZURE_PASSWORD: Azure Dev Ops PAT token encoded as BASE64 string or "pure" PAT
// - AZURE_REGISTRY_NAME: Name of the registry
// - AZURE_ORGANIZATION: Name of your ADO organization
// - AZURE_PROJECT: NAME of your Project (optional)
// - AZURE_USERNAME: Name of the user, usually the same as ORG (optional)
// - AZURE_EMAIL: Email of the user, creator of the AZURE_PASSWORD
// - AZURE_REGISTRY_SCOPE: Scope for the registry (optional)
// - AZURE_ENCODE_PASSWORD: Indicates if the AZURE_PASSWORD is encoded as BASE64 string or "pure" PAT, optional

export async function run(): Promise<void> {
  try {
    const args = parseArgs()
    core.debug('Args parsed')
    const content = generateWriteContent(args)
    core.debug('Content generated')
    writeFile(content)
    core.debug('File written')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
