type Images = {
  downsized: {
    url: string,
    width: number,
    height: number,
    size: number
  }
}

export type Gif = {
  type: string,
  id: string,
  title: string,
  images: Images
}

export type Pack = {
  id: number,
  gifs: Gif []
}

export type StateBase = {
  page: number,
  limit: number,
  pages: Pack [],
  countPages: number,
  isLoading: boolean,
  hasNextPage: boolean,
  countItems: number
}

export type StateBaseSearch = {
  page: number,
  limit: number,
  pages: Pack [],
  countPages: number,
  isLoading: boolean,
  hasNextPage: boolean,
  search: string
  force: boolean,
  countItems: number
}

export type StateNames = 'home' | 'favorites' | 'search';