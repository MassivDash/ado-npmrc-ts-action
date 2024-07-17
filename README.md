# Azure Dev Ops .npmrc maker github action

[![GitHub Super-Linter](https://github.com/actions/hello-world-javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/hello-world-javascript-action/actions/workflows/ci.yml/badge.svg)

This action will create a .npmrc file with authorization needed to access Azure
Dev Ops internal npm registry / feed.

```
registry=https://pkgs.dev.azure.com//_packaging/UPSTREAM_NPM_REG/npm/registry/
always-auth=true
; begin auth token
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/registry/:username=JLL-DSEMEA
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/registry/:_password=cHI3dDZqNmx1dWJmcHlnbTRvYzUydnJvenZ6c3dnbW42NzU3ZGJ5dWI2ZGZ4Zmdsb3cycQ==
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/registry/:email=lukasz.celitan@eu.jll.com
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/:username=JLL-DSEMEA
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/:_password=cHI3dDZqNmx1dWJmcHlnbTRvYzUydnJvenZ6c3dnbW42NzU3ZGJ5dWI2ZGZ4Zmdsb3cycQ==
//pkgs.dev.azure.com/JLL-DSEMEA/_packaging/UPSTREAM_NPM_REG/npm/:email=lukasz.celitan@eu.jll.com
; end auth token

```

Works on all OS types (mac, windows, linux) with node >= 20.0.0 setup

## Prerequisites

- Azure Dev Ops npm registry
- Azure PAT token

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

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow

on:
  workflow_dispatch:
    inputs:
      azure-registry:
        description: Who to greet in the log
        required: true
        default: 'World'
        type: string

jobs:
  say-hello:
    name: Say Hello
    runs-on: ubuntu-latest

    steps:
      # Change @main to a specific commit SHA or version tag, e.g.:
      # actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
      # actions/hello-world-javascript-action@v1.2.3
      - name: Print to Log
        id: print-to-log
        uses: actions/hello-world-javascript-action@main
        with:
          who-to-greet: ${{ inputs.who-to-greet }}
```
