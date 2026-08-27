const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export type CloudinaryUploadResult = {
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
};

export async function uploadImageToCloudinary(uri: string): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary no está configurado en este entorno.');
  }

  const formData = new FormData();
  formData.append('file', {
    uri,
    type: 'image/jpeg',
    name: `cafecom-${Date.now()}.jpg`,
  } as unknown as Blob);
  formData.append('upload_preset', uploadPreset!);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('No fue posible subir la imagen a Cloudinary.');
  }

  const data = await response.json() as {
    public_id: string;
    secure_url: string;
    width?: number;
    height?: number;
  };

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    width: data.width,
    height: data.height,
  };
}
