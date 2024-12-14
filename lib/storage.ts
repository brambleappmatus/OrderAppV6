import { supabase } from './supabase';
import { STORAGE_CONFIG } from './config';

const { FALLBACK_IMAGE_URL } = STORAGE_CONFIG;

export async function uploadImage(file: File, bucket: string = 'images'): Promise<{ url: string; path: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${bucket === 'rescues' ? 'rescues' : 'products'}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return {
      url: data.publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(path: string | null, bucket: string = 'images'): Promise<void> {
  if (!path) return;

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export function getImageUrl(path: string | null, bucket: string = 'images'): string {
  if (!path) return FALLBACK_IMAGE_URL;

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data?.publicUrl || FALLBACK_IMAGE_URL;
}