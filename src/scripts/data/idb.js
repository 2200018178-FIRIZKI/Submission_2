// filepath: src/scripts/data/idb.js
import { openDB } from 'idb';

const DB_NAME = 'ruangkisah-db';
const STORE_NAME = 'stories';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

export async function saveStory(story) {
  return (await dbPromise).put(STORE_NAME, story);
}

export async function getAllStories() {
  return (await dbPromise).getAll(STORE_NAME);
}

export async function deleteStory(id) {
  return (await dbPromise).delete(STORE_NAME, id);
}