import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  accessToken?: string;
}
type UseMutationResult<T> = [(data?: any) => void, UseMutationState<T>];

function useMutation<T = any>(url: string, accessToken?: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
    accessToken,
  });

  function mutation(data?: any) {
    setState(prev => ({ ...prev, loading: true }));
    fetch(url, {
      method: `${data ? 'POST' : 'GET'}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json().catch(() => {}))
      .then(data => setState(prev => ({ ...prev, data })))
      .catch(error => setState(prev => ({ ...prev, error })))
      .finally(() => setState(prev => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
export default useMutation;
