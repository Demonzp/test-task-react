import { IResGifsParceServer, IResGifsIn, IResSearchGifs } from '../types/serverData';
import axiosService from './axiosService';

const parseServerData = (page:number,data:IResGifsIn|IResSearchGifs):IResGifsParceServer=>{
  return {
    ...data,
    pagination: {
      ...data.pagination,
      pages: Math.ceil(data.pagination.total_count/data.pagination.count),
      page
    },
    data: data.data.map((objGif) => {
      return {
        ...objGif,
        id: objGif.id+Math.floor(Math.random()*100),
        images: {
          downsized: {
            ...objGif.images.downsized,
            width: Number(objGif.images.downsized.width),
            height: Number(objGif.images.downsized.height),
            size: Number(objGif.images.downsized.size)
          }
        }
      }
    })
  }; 
}

export const fetchGifsReq = async (page: number, limit: number): Promise<IResGifsParceServer> => {
  try {

    const res = await axiosService.get<IResGifsIn>('/trending',{
      limit: limit,
      offset: page<=1?0:(page-1)*limit
    });

    return parseServerData(page, res.data);

  } catch (error) {
    throw error;
  }
};

export const searchGifsReq = async (search: string, page: number, limit: number): Promise<IResSearchGifs>=>{
  try {
    const res = await axiosService.get<IResSearchGifs>('/search',{
      limit: limit,
      offset: page<=1?0:(page-1)*limit,
      q:search
    });

    return {...parseServerData(page, res.data), search};

  } catch (error) {
    throw error;
  }
}