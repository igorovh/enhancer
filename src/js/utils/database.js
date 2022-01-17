const request = indexedDB.open('twitchenhancer');
let db;

request.onupgradeneeded = () => {
    console.info('[te] Creating database...');
    const db = request.result;
    const store = db.createObjectStore('users', { keyPath: 'name' });
    store.createIndex('by_name', 'name', { unique: true });
    store.createIndex('by_timestamp', 'timestamp');
};

request.onsuccess = () => {
    console.info('[te] Database found!');
    db = request.result;
    const tx = db.transaction('users', 'readwrite');
    const range = IDBKeyRange.upperBound(new Date());
    tx
      .objectStore('users')
      .index('by_timestamp')
      .openCursor(range).onsuccess = (e) => {
        const cursor = e.target.result;
        if (!cursor) return;
        cursor.delete();
        cursor.continue();
    };
};

async function getUser(name) {
    const tx = db.transaction('users', 'readonly');
    const users = tx.objectStore('users');
    const index = users.index('by_name');

    const request = index.get(name);
    return new Promise(resolve => {
        request.onsuccess = () => {
            const matching = request.result;
            if(matching) return resolve(matching);
            else return resolve({ error: 404 });
        };
    });
}

function addUser(user) {
    const tx = db.transaction('users', 'readwrite');
    const users = tx.objectStore('users');
    users.put({
        name: user.name,
        streamer: user.streamer,
        timestamp: new Date(Date.now() + 86400000) // 24 hours
    });
}