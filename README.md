<h1 align="center">📦 Azure Dev Ops .npmrc maker github action </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/MassivDash/typescript-react-express-esbuild" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/SpaceoutPl" target="_blank">
    <img alt="Twitter: SpaceoutPl" src="https://img.shields.io/twitter/follow/SpaceoutPl.svg?style=social" />
  </a>
</p>

![GitHub Super-Linter](https://github.com/MassivDash/ado-npmrc-ts-action/actions/workflows/linter.yml/badge.svg)![CI](https://github.com/MassivDash/ado-npmrc-ts-action/actions/workflows/ci.yml/badge.svg)![Compliation](https://github.com/MassivDash/ado-npmrc-ts-action/actions/workflows/check-dist.yml/badge.svg)![CodeCoverage](./badges/coverage.svg)

**Platforms**

![windows](https://img.shields.io/badge/Platform-Windows-blue)
![linux](https://img.shields.io/badge/Platform-Linux-blue)
![macOs](https://img.shields.io/badge/Platform-MacOs-blue)

This action will create a .npmrc file with authorization needed to access Azure
Dev Ops internal npm registry / feed. Works on all github OS machines (Windows,
Linux, MacOS)

**Minimal node version**

![Static Badge](https://img.shields.io/badge/_node_-%3E%3D_20.6.0-red)

```
registry=https://pkgs.dev.azure.com/AZURE_ORGANIZATION/_packaging/AZURE_REGISTRY_NAME/npm/registry/
always-auth=true
; begin auth token
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/registry/:username=AZURE_USERNAME
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/registry/:_password=AZURE_PASSWORD
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/registry/:email=AZURE_EMAIL
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/:username=AZURE_USERNAME
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/:_password=AZURE_PASSWORD
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/AZURE_REGISTRY_NAME/npm/:email=AZURE_EMAIL
; end auth token
```

\*action works with project based feeds aswell

Works on all OS types (mac, windows, linux) with node >= 20.0.0 setup

---

## Prerequisites

- Azure Dev Ops npm registry
- Azure PAT token

---

## Variables

| Variable              | Description                                                                         | Required | Example       | Type    |
| --------------------- | ----------------------------------------------------------------------------------- | -------- | ------------- | ------- |
| AZURE_PASSWORD        | Azure Dev Ops PAT token encoded as BASE64 string or "pure" PAT                      | Yes      | BASE64_STRING | string  |
| AZURE_REGISTRY_NAME   | Name of the registry                                                                | Yes      | Upstream      | string  |
| AZURE_ORGANIZATION    | Name of your ADO organization                                                       | Yes      | Org           | string  |
| AZURE_PROJECT         | NAME of your Project (optional)                                                     | No       | Project       | string  |
| AZURE_USERNAME        | Name of the user, usually the same as ORG                                           | No       | ORG           | string  |
| AZURE_EMAIL           | Email of the user, creator of the AZURE_PASSWORD                                    | Yes      | user@org.com  | string  |
| AZURE_REGISTRY_SCOPE  | Scope for the registry (optional)                                                   | No       | @your-org     | string  |
| AZURE_ENCODE_PASSWORD | Indicates if the AZURE_PASSWORD is encoded as BASE64 string or "pure" PAT, optional | No       | false         | boolean |

---

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow
on:
  workflow_dispatch:
    inputs:
      inputs:
        AZURE_PASSWORD:
          description:
            'Azure Dev Ops PAT token encoded as BASE64 string or "pure" PAT'
          required: true
          default: ''
          type: string
        AZURE_REGISTRY_NAME:
          description: 'Name of the registry'
          required: true
          default: 'Upstream'
          type: string
        AZURE_ORGANIZATION:
          description: 'Name of your ADO organization'
          required: true
          default: 'Org'
          type: string
        AZURE_PROJECT:
          description: 'NAME of your Project (optional)'
          required: false
          default: 'Project'
          type: string
        AZURE_USERNAME:
          description: 'Name of the user, usually the same as ORG'
          required: false
          default: 'ORG'
          type: string
        AZURE_EMAIL:
          description: 'Email of the user, creator of the AZURE_PASSWORD'
          required: true
          default: 'user@org.com'
          type: string
        AZURE_REGISTRY_SCOPE:
          description: 'Scope for the registry (optional)'
          required: false
          default: '@your-org'
          type: string
        AZURE_ENCODE_PASSWORD:
          description:
            'Indicates if the AZURE_PASSWORD is encoded as BASE64 string or
            "pure" PAT, optional'
          required: false
          default: false
          type: boolean

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest

    steps:
      # Change @main to a specific commit SHA or version tag, e.g.:
      # MassivDash/ado-npmrc-ts-action@e76147da8e5c81eaf017dede5645551d4b94427b
      # MassivDash/ado-npmrc-ts-action@v0.0.3

      - name: Create a Azure Dev Ops .npmrc file
        id: ado-npmrc
        uses: MassivDash/ado-npmrc-ts-action@v0.0.2
        with:
          AZURE_PASSWORD: { { secrets.AZURE_PASSWORD } }
          AZURE_REGISTRY_NAME: 'registry'
          AZURE_USERNAME: 'username'
          AZURE_ORGANIZATION: 'organization'
          AZURE_EMAIL: 'user@email.com'
```

---

<img src="https://spaceout.pl/icons/icon-96x96.png?v=c01d3dc2404b91dfce33d962ff296151" alt="spaceout.pl" />

Luke Celitan, [Spaceghost](https://spaceout.pl/about)

x: [@Spaceout.pl] https://spaceout.pl
