import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'src/atoms';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  accessToken?: string;
}
type UseMutationResult<T> = [(data?: any) => void, UseMutationState<T>];

function useMutation<T = any>(url: string, method?: string): UseMutationResult<T> {
  const accessToken = useRecoilValue(userInfoAtom);
  const [state, setState] = useState<UseMutationState<T>>({
    loading: true,
    data: undefined,
    error: undefined,
    accessToken,
  });

  function mutation(data?: any) {
    setState(prev => ({ ...prev, loading: true }));
    fetch(`${process.env.REACT_APP_BASE_URL}` + url, {
      method: `${method ? method : data?.name ? 'PATCH' : data ? 'POST' : 'GET'}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.accessToken}`,
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
