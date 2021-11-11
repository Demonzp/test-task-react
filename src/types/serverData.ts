import { Gif } from './store';

type Images = {
  downsized: {
    url: string,
    width: string,
    height: string,
    size: string
  }
}

export type ResGif = {
  type: string,
  id: string,
  title: string,
  images: Images
}

export interface IResSearchGifs extends IResGifsParceServer {
  search: string
}

export interface IResGifsParceServer extends IResGifsServerOut {
  data: Gif[]
}

export interface IResGifsIn extends IResGifsServerIn {
  data: ResGif[]
}

export interface IResGifsLocal extends IResGifsBaseOut {
  data: Gif[]
}

interface IResGifsServerIn extends IResGifsBaseIn {
  meta: {
    msg: string,
    status: number,
    response_id: string
  }
}

interface IResGifsServerOut extends IResGifsBaseOut {
  meta: {
    msg: string,
    status: number,
    response_id: string
  }
}

interface IResGifsBaseIn {
  pagination: {
    offset: number,
    total_count: number,
    count: number,
  }
}

interface IResGifsBaseOut {
  pagination: {
    offset: number,
    total_count: number,
    count: number,
    pages: number,
    page: number
  }
}