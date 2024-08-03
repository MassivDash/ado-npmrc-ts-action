import fs from 'fs'
import { Args, encodePassword } from '../libs'

function generateUrl (args: Args): string {
  if (typeof args.AZURE_PROJECT === 'string' && args.AZURE_PROJECT !== '') {
    return `pkgs.dev.azure.com/${args.AZURE_ORGANIZATION}/${args.AZURE_PROJECT}/_packaging/${args.AZURE_REGISTRY_NAME}/npm`
  }
  return `pkgs.dev.azure.com/${args.AZURE_ORGANIZATION}/_packaging/${args.AZURE_REGISTRY_NAME}/npm`
}

function generateRegistry (args: Args): string {
  let scope = ''
  if (
    typeof args.AZURE_REGISTRY_SCOPE === 'string' &&
    args.AZURE_REGISTRY_SCOPE !== ''
  ) {
    scope = `${args.AZURE_REGISTRY_SCOPE}:`
  }
  return `${scope}registry=https://${generateUrl(args)}/registry/
always-auth=true
`
}

function generateCredentials (args: Args): string {
  const url = generateUrl(args)
  const password = encodePassword(args)
  return `; begin auth token
//${url}/registry/:username=${args.AZURE_USERNAME}
//${url}/registry/:_password="${password}"
//${url}/registry/:email=${args.AZURE_EMAIL}
//${url}/:username=${args.AZURE_USERNAME}
//${url}/:_password="${password}"
//${url}/:email=${args.AZURE_EMAIL}
; end auth token`
}

export function generateWriteContent (args: Args): string {
  return generateRegistry(args) + generateCredentials(args)
}

export function writeFile (content: string): void {
  // We need to write the file to the current workspace

  let path = '.npmrc'
  const workspace = process.env.GITHUB_WORKSPACE
  if (typeof workspace === 'string' && workspace !== '') {
    path = `${workspace}/.npmrc`
  }
  fs.writeFileSync(path, content)
}
