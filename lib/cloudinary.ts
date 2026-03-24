import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function getAudioUrl(
  publicId: string,
  quality: 'high' | 'medium' | 'low' = 'medium'
): string {
  const bitrates = { high: '128k', medium: '64k', low: '32k' }
  
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'mp3',
    audio_codec: 'mp3',
    bit_rate: bitrates[quality],
  })
}

export function getCoverUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'auto' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  })
}