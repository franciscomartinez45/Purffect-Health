import axios from 'axios';

const API_KEY = '26074babae0812546b7da10bf0b96188010e8a0f23468c57b644c1d0c50fa533';  
const BASE_URL = 'https://serpapi.com/search'; 

export const search = async (location: String) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        engine: "google_maps",
        q: "Vet",
        ll:"@33.827820,-118.272346,14z",
        api_key: API_KEY,
        type: 'search',
      }
    });
    
    return response.data; 
  } catch (error) {
    console.error(error);
  }
};
