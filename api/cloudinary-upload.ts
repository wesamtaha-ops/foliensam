// Vercel Serverless Function for Signed Cloudinary Uploads
// This allows overwriting files with the same public_id

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dm2hybs2u',
  api_key: process.env.CLOUDINARY_API_KEY || '936299522791882',
  api_secret: process.env.CLOUDINARY_API_SECRET || '4XLvHPMlpHvsEggGKwppelcMxhs',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, publicId } = req.body;

    if (!data || !publicId) {
      return res.status(400).json({ error: 'Missing data or publicId' });
    }

    // Convert JSON data to base64 for upload
    const jsonString = JSON.stringify(data, null, 2);
    const base64Data = Buffer.from(jsonString).toString('base64');
    const dataUri = `data:application/json;base64,${base64Data}`;

    // Upload with overwrite enabled (signed upload)
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId,
      resource_type: 'raw',
      overwrite: true,
      invalidate: true, // Clear CDN cache
    });

    console.log('✅ Uploaded:', result.secure_url, 'Version:', result.version);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      version: result.version,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Upload failed' 
    });
  }
}

