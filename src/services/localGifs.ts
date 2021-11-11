import { Gif } from '../types/store';
import { IResGifsLocal } from '../types/serverData';

class IdxDB {
  db: IDBDatabase | null = null;

  constructor() {
    const request = indexedDB.open('Favorites', 1);

    request.addEventListener('upgradeneeded', this.upgradeneeded.bind(this));
    request.addEventListener('success', this.success.bind(this));
  }

  private upgradeneeded(event: any) {
    this.db = event.target.result;
    if (this.db) {
      if (!this.db.objectStoreNames.contains('gifs')) {
        let gifs = this.db.createObjectStore('gifs', { keyPath: 'id' });
        gifs.createIndex('title', 'title', { unique: false });
      }
    }
  }

  private success(event: any) {
    if (!this.db) {
      this.db = event.target.result;
    }

    const tempDB = this.db as IDBDatabase;

    tempDB.onversionchange = () => {
      tempDB.close();
      alert("The database is out of date, please reload the page.")
    };

  }

  isConnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.db) {
        resolve();
      }
      const timer = setInterval(() => {
        if (this.db) {
          clearInterval(timer);
          resolve();
        }
      }, 30);
    })
  }

  async getGifByIdReq(id: string): Promise<Gif | undefined> {
    await this.isConnect();

    return new Promise((resolve, reject) => {
      const tempDB = this.db as IDBDatabase;
      const transactionGif = tempDB.transaction('gifs', 'readwrite');
      const gifs = transactionGif.objectStore('gifs');
      const request = gifs.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
        console.log("Ошибка", request.error);
      };
    });
  }

  private async countData(): Promise<number> {

    return new Promise((resolve) => {

      (this.db as IDBDatabase).transaction(['gifs'], 'readonly').objectStore('gifs').count().onsuccess = function (e: any) {
        resolve(Number(e.target.result));
      };

    });

  }

  async getGifs(page: number, limit: number): Promise<IResGifsLocal> {
    await this.isConnect();
    const count = await this.countData();
    const countPages = Math.ceil(count / limit);
    let tempPage = page > countPages ? countPages : page;
   
    let start = (tempPage - 1) * limit;

    return new Promise((resolve, reject) => {
      const transactionGif = (this.db as IDBDatabase).transaction('gifs', 'readonly');
      const gifs = transactionGif.objectStore('gifs');
      const request = gifs.openCursor();
      const res: Gif[] = [];
      let hasSkipped = false;
      let i = 0;

      request.onsuccess = () => {
        let cursor = request.result;
        if (!hasSkipped && start > 0) {
          hasSkipped = true;
          (cursor as IDBCursorWithValue).advance(start);
          return;
        }

        if (cursor) {
          res.push(cursor.value);
          i++;
          if (i >= limit) {
            resolve({
              pagination: {
                offset: i*(tempPage-1),
                total_count: count,
                count: limit,
                pages: countPages,
                page: tempPage
              },
              data: res
            });
          } else {
            cursor.continue();
          }
        } else {
          resolve({
            pagination: {
              offset: i*(tempPage-1),
              total_count: count,
              count: limit,
              pages: countPages,
              page: tempPage
            },
            data: res
          });
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async addGifReq(gif: Gif): Promise<boolean> {
    await this.isConnect();

    return new Promise((resolve, reject) => {
      const tempDB = this.db as IDBDatabase;
      const transactionGif = tempDB.transaction('gifs', 'readwrite');
      const gifs = transactionGif.objectStore('gifs');
      const request = gifs.add(gif);

      request.onsuccess = async () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async delGifReq(id: string): Promise<boolean> {
    await this.isConnect();

    return new Promise((resolve, reject) => {
      const tempDB = this.db as IDBDatabase;
      const transactionGifs = tempDB.transaction('gifs', 'readwrite');
      const gifs = transactionGifs.objectStore('gifs');
      const request = gifs.delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        console.error(request.error);
        reject(request.error);
      };
    });
  }
}

const idxDB = new IdxDB();

export default idxDB;