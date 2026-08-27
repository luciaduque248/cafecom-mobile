const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

type UploadableImage = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
};

type CloudinaryUploadResponse = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

export async function uploadImage(image: UploadableImage): Promise<CloudinaryUploadResponse> {
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary no está configurado.');
  }

  const body = new FormData();
  body.append('file', {
    uri: image.uri,
    type: image.mimeType ?? 'image/jpeg',
    name: image.fileName ?? `cafecom-${Date.now()}.jpg`,
  } as unknown as Blob);
  body.append('upload_preset', uploadPreset);
  body.append('folder', 'cafecom');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('No fue posible subir la imagen.');
  }

  return response.json() as Promise<CloudinaryUploadResponse>;
}
