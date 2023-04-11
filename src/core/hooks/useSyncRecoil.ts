import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RecoilState } from 'recoil';

export type Param<T> = {
  atom: RecoilState<T>;
  defaultValue: T;
};

export function useSyncRecoil<T>({ atom, defaultValue }: Param<T>) {
  const atomValue = useRecoilValue<T>(atom);
  const [state, setState] = useState<T>(defaultValue);

  useLayoutEffect(() => {
    setState(atomValue);
  }, [atomValue]);

  return state;
}
