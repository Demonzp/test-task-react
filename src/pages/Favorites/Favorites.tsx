import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import GifsPack from '../../components/GifsPack';
import useScrollLoad from '../../hooks/useScrollLoad';
import { delFromFavorites, getFavorites } from '../../store/actions/favorites';
import { useAppDispatch } from '../../store/hooks';
import { clearState } from '../../store/slices/sliceFavorites';
import { Gif } from '../../types/store';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchNextPage, clearFunction, pages, hasNextPage } = useScrollLoad('favorites', getFavorites, clearState);

  useEffect(() => {
    return () => clearFunction();
  }, []);

  const clickGifHandle = async (gif: Gif) => {
    await dispatch(delFromFavorites(gif.id));
    fetchNextPage();
  };

  return (
    <Container>
      <InfiniteScroll
        className="full"
        dataLength={pages.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<div>Loading...</div>}
      >
        {
          pages.map(page => {
            return <GifsPack key={page.id} pack={page} onClick={clickGifHandle} />;
          })
        }
      </InfiniteScroll>
    </Container>
  );
}

export default Favorites;