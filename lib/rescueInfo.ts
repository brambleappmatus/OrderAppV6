import { supabase } from './supabase';
import { RescueInfo } from '@/types/rescue';
import { uploadImage } from './storage';

export async function fetchRescueInfo(): Promise<RescueInfo | null> {
  try {
    const { data, error } = await supabase
      .from('shelter_rescue_of_the_week')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching rescue info:', error);
    return null;
  }
}

export async function updateRescueInfo(info: Partial<RescueInfo>): Promise<RescueInfo | null> {
  try {
    const { data, error } = await supabase
      .from('shelter_rescue_of_the_week')
      .insert([{
        title: info.title,
        description: info.description,
        image_url: info.image_url
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from update operation');

    return data;
  } catch (error) {
    console.error('Error updating rescue info:', error);
    throw error;
  }
}

export async function uploadRescueImage(file: File): Promise<{ url: string; path: string }> {
  return uploadImage(file, 'rescues');
}