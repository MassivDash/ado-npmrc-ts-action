import type { Args } from '@libs'

export function encodePassword(args: Args): string {
  if (
    args.AZURE_ENCODE_PASSWORD === 'true' ||
    args.AZURE_ENCODE_PASSWORD === true
  ) {
    return Buffer.from(args.AZURE_PASSWORD, 'utf-8').toString('base64')
  }
  return args.AZURE_PASSWORD
}
