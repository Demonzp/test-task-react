import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import useScrollLoad from '../../hooks/useScrollLoad';
import { Gif } from '../../types/store';
import { addToFavorite } from '../../store/actions/favorites';
import GifsPack from '../../components/GifsPack';
import { clearState } from '../../store/slices/sliceSearch';
import { searchGifs, setSearchGlobal } from '../../store/actions/search';
import { useAppSelector } from '../../store/hooks';
import { RouteNames } from '../../types/routeNames';
import GifCardIcon from '../../components/GifCardIcon';

const SearchPage: React.FC = ()=>{
  const {force} = useAppSelector(state=>state.search);
  const [searchParams, _] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const search = searchParams.get('q');
    if(search){
      dispatch(setSearchGlobal(search));
    }
  }, [searchParams]);

  useEffect(()=>{
    if(force){
      fetchNextPage();
    }
  },[force]);

  const {pages, fetchNextPage, hasNextPage, countItems, clearFunction} = useScrollLoad('search', searchGifs, clearState);
  
  useEffect(()=>{
    return ()=> clearFunction();
  }, []);

  const clickGifHandle = (gif: Gif) => {
    dispatch(addToFavorite(gif));
  };

  const closeHandle = ()=>{
    navigate(RouteNames.HOME);
  };

  return(
    <Container>
      <Alert variant="success" onClose={closeHandle} dismissible>
        <Alert.Heading>{`found ${countItems} according to your request " ${searchParams.get('q')} "`}</Alert.Heading>
      </Alert>
      <InfiniteScroll
        className="full"
        dataLength={pages.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<div>Loading...</div>}
      >
        {
          pages.map(page => {
            return (
              <GifsPack key={page.id} pack={page} onClick={clickGifHandle}>
                <GifCardIcon icon="heart"/>
              </GifsPack>
            );
          })
        }
      </InfiniteScroll>
    </Container>
  );
};

export default SearchPage;