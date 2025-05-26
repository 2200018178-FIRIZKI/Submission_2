import { openDB } from 'idb';

const DB_NAME = 'ruangkisah-db';
const STORE_NAME = 'bookmarks';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const BookmarkStorage = {
  async getAllBookmarks() {
    return (await dbPromise).getAll(STORE_NAME);
  },

  async saveBookmark(story) {
    return (await dbPromise).put(STORE_NAME, story);
  },

  async removeBookmark(storyId) {
    return (await dbPromise).delete(STORE_NAME, storyId);
  },

  async isBookmarked(storyId) {
    return !!(await (await dbPromise).get(STORE_NAME, storyId));
  },
};

export default BookmarkStorage;