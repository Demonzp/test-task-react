import { IResGifsParceServer, IResGifsIn, IResSearchGifs } from '../types/serverData';
import axiosService from './axiosService';

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

    const res = await axiosService.get<IResGifsIn>('',{
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
    const res = await axiosService.get<IResSearchGifs>('',{
      limit: limit,
      offset: page<=1?0:(page-1)*limit,
      q:search
    });

    return {...parseServerData(page, res.data), search};

  } catch (error) {
    throw error;
  }
}