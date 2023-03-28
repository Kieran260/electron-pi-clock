const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    mapsApiKey: process.env.GOOGLE_MAPS_API,
});
