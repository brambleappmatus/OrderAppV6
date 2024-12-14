import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { RescueInfo } from '@/types/rescue';

export function useRescueInfo() {
  const [rescueInfo, setRescueInfo] = useState<RescueInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRescueInfo = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shelter_rescue_of_the_week')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setRescueInfo(data);
    } catch (err) {
      console.error('Error fetching rescue info:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch rescue info'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRescueInfo();
  }, [fetchRescueInfo]);

  return { rescueInfo, isLoading, error, refreshRescueInfo: fetchRescueInfo };
}