import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import GifCardIcon from '../../components/GifCardIcon';
import GifsPack from '../../components/GifsPack';
import MySpinner from '../../components/Spinner';
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
                <GifCardIcon icon="trash"/>
              </GifsPack>
            );
          })
        }
      </InfiniteScroll>
    </Container>
  );
}

export default Favorites;