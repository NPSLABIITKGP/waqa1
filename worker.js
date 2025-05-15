require('dotenv').config();
const { parentPort, workerData } = require('worker_threads');
const fetch = require('node-fetch');

// Fetch address with retry and timeout
// async function fetchWithRetry(url, retries = 3, timeout = 30000) {
//     for (let i = 0; i < retries; i++) {
//         try {
//             const controller = new AbortController();
//             const timeoutId = setTimeout(() => controller.abort(), timeout);

//             const response = await fetch(url, { signal: controller.signal });
//             clearTimeout(timeoutId); // Clear the timeout if fetch completes on time

//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//         } catch (error) {
//             // console.error(`Fetch attempt ${i + 1} failed:`, error.message);
//             // If it's the last retry, throw the error
//             if (i === retries - 1) throw error;
//         }
//     }
// }

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 3, backoff = 300) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Response not OK');
        } catch (error) {
            if (i < retries - 1) {
                await delay(backoff * (2 ** i)); // Exponential backoff
            } else {
                throw error;
            }
        }
    }
}

// Fetch a single address and handle errors
async function fetchAddress(lat, lon, key) {
    // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`;
    try {
        const data = await fetchWithRetry(url);
        // return { key, display_name: data.display_name };
        const result = data.results[0];
        const { name, city, county, suburb, district, state_district, state } = result;
        const formattedAddress = [name, city, (suburb||county), (district||state_district), state]
            .filter(Boolean)
            .join(", ");

        return { key, display_name: formattedAddress };
    } catch (error) {
        console.error(`Error fetching reverse geocode for (${lat}, ${lon}):`, error);
        return { key, display_name: 'Address not found' };
    }
}

// Process batch of locations
async function processBatch(locations) {
    const results = await Promise.all(locations.map(({ lat, lon, key }) => fetchAddress(lat, lon, key)));
    return results;
}

// Run the worker logic
processBatch(workerData).then((addresses) => {
    parentPort.postMessage(addresses);
});
