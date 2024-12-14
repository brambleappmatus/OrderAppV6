import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export function useDonationAmount() {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAmount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('donations_collected')
        .select('collected_amount')
        .single();

      if (error) throw error;
      
      if (data) {
        setAmount(data.collected_amount);
      }
    } catch (err) {
      console.error('Error fetching donation amount:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch donation amount'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAmount();
  }, [fetchAmount]);

  return { 
    amount, 
    isLoading, 
    error,
    refreshAmount: fetchAmount
  };
}