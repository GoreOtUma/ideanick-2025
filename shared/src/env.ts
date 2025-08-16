/* eslint-disable node/no-process-env */
import { z } from 'zod'
import { zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from './zod'

const sharedEnvRaw = {
  CLOUDINARY_CLOUD_NAME: process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  S3_URL: process.env.VITE_S3_URL || process.env.S3_URL,
  WEBAPP_URL: process.env.VITE_WEBAPP_URL || process.env.WEBAPP_URL,
  S3_BUCKET_NAME: process.env.VITE_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME,
}

const zEnv = z.object({
  WEBAPP_URL: zEnvNonemptyTrimmed,
  CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  S3_URL: zEnvNonemptyTrimmed,
  S3_BUCKET_NAME: zEnvNonemptyTrimmedRequiredOnNotLocal,
})

export const sharedEnv = zEnv.parse(sharedEnvRaw)
