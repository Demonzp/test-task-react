//import * as dotenv from 'dotenv';
import { Gif } from '../types/store';
import { IResGifsParceServer, ResGif, IResGifsIn, IResSearchGifs } from '../types/serverData';
import axiosService from './axiosService';

//dotenv.config();
// const gifs = (): Gif []=>{
//   const arrGifs: Gif [] = [];

//   for (let i = 0; i < 20; i++) {
//     const gif: Gif = {
//       id: `${i}_${Math.random()*1000}`,
//       type: 'gif',
//       title: 'gif',
//       images:{
//         downsized:{
//           url: 'url',
//           width: 200,
//           height: 200,
//           size: 200
//         }
//       }
//     };

//     arrGifs.push(gif);
//   }

//   return arrGifs;
// }

// const delay = (time: number)=> new Promise((resolve)=>setTimeout(resolve, time));

// export const fetchGifsReq2 = async (page: number, limit: number): Promise<IResGifsParceServer> => {
//   try {
//     console.log('хочу = ', page,' || ', limit);
//     await delay(1500);
//     return {
//       data: gifs(),
//       meta: {
//         msg: 'dawd',
//         status: 200,
//         response_id: '1'
//       },
//       pagination:{
//         count: 20,
//         total_count: 200,
//         page,
//         pages: 200/20,
//         offset: limit*page
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchGifsReq = async (page: number, limit: number): Promise<IResGifsParceServer> => {
  try {
    console.log('API = ', process.env.REACT_APP_API_KEY);
    const res = await axiosService.axios.get<IResGifsIn>('', {
      params: {
        api_key: process.env.API_KEY,
        limit: limit,
        offset: page<=1?0:(page-1)*limit
      }
    });

    return {
      ...res.data,
      pagination: {
        ...res.data.pagination,
        pages: Math.ceil(res.data.pagination.total_count/res.data.pagination.count),
        page
      },
      data: res.data.data.map((objGif: ResGif): Gif => {
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
  } catch (error) {
    throw error;
  }
};

export const searchGifsReq = async (search: string, page: number, limit: number): Promise<IResSearchGifs>=>{
  try {
    const res = await axiosService.axios.get('',{
      params:{
        q:search,
        api_key: process.env.API_KEY,
        limit: limit,
        offset: page<=1?0:(page-1)*limit
      }
    });

    return {
      ...res.data,
      pagination: {
        ...res.data.pagination,
        pages: Math.ceil(res.data.pagination.total_count/res.data.pagination.count),
        page
      },
      data: res.data.data.map((objGif: ResGif): Gif => {
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
      }),
      search
    };

  } catch (error) {
    throw error;
  }
}