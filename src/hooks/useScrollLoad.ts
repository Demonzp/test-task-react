import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { StateNames } from '../types/store';


const useScrollLoad = (stateName: StateNames, getData: any, clearState: any) => {
  const { pages, hasNextPage, countItems } = useAppSelector(state => state[stateName]);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getData());
  }, []);

  const fetchNextPage = ()=>{
    dispatch(getData());
  };

  const clearFunction = ()=>{
    dispatch(clearState());
  };

  return {
    fetchNextPage,
    clearFunction,
    pages,
    hasNextPage,
    countItems
  }
}

export default useScrollLoad;