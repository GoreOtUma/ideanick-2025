/* eslint-disable node/no-process-env */
import { z } from 'zod'
import { zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from './zod'

declare global {
  const webappEnvFromBackend: Record<string, string> | undefined
}
const windowEnv = typeof webappEnvFromBackend !== 'undefined' ? webappEnvFromBackend : {}
const getSharedEnvVariable = (key: string) =>
  windowEnv[`VITE_${key}`] || windowEnv[key] || process.env[`VITE_${key}`] || process.env[key]

const sharedEnvRaw = {
  CLOUDINARY_CLOUD_NAME: process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  S3_URL: process.env.VITE_S3_URL || process.env.S3_URL,
  WEBAPP_URL: process.env.VITE_WEBAPP_URL || process.env.WEBAPP_URL,
  S3_BUCKET_NAME: getSharedEnvVariable('S3_BUCKET_NAME'),
}

const zEnv = z.object({
  WEBAPP_URL: zEnvNonemptyTrimmed,
  CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  S3_URL: zEnvNonemptyTrimmed,
  S3_BUCKET_NAME: zEnvNonemptyTrimmedRequiredOnNotLocal,
})

export const sharedEnv = zEnv.parse(sharedEnvRaw)
