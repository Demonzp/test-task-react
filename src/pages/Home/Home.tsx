import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import GifsPack from '../../components/GifsPack';
import { useAppDispatch } from '../../store/hooks';
import useScrollLoad from '../../hooks/useScrollLoad';
import { fetchGifs } from '../../store/actions/home';
import { Gif } from '../../types/store';
import { addToFavorite } from '../../store/actions/favorites';
import { clearState } from '../../store/slices/sliceHome';
import GifCardIcon from '../../components/GifCardIcon';
import MySpinner from '../../components/Spinner';


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchNextPage, clearFunction, pages, hasNextPage } = useScrollLoad('home', fetchGifs, clearState);

  useEffect(() => {
    return () => clearFunction();
  }, [])

  const clickGifHandle = (gif: Gif) => {
    dispatch(addToFavorite(gif));
  };

  return (
    <Container className="px-5">
      <InfiniteScroll
        className="full"
        dataLength={pages.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<MySpinner />}
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
}

export default Home;