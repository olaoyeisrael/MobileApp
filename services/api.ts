import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const Backend_CONFIG = {
    BASE_URL: "https://pressureulcer.onrender.com",
    headers: {
      accept: "application/json",
    },
  };

  export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  
  // export const fetchBed = async ({
  //   query,
  //   token
  // }: {
  //   query: string,
  //   token: string;
  // }): Promise<Bed[]> => {
  //   const endpoint = `${Backend_CONFIG.BASE_URL}/api/beds/caregiver/{userid}`;
  //   const response = await fetch(endpoint, {
  //     method: "GET",
  //     headers: Backend_CONFIG.headers,
  //   });

  //   console.log('Here')
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch beds: ${response.statusText}`);
  //   }
  //   const data = await response.json();
  //   console.log(data)
  //   return data;
    
  // };
  
  export const fetchBed = async ({
    query, token
  }: {
    query: string;
    token: string; // userId
  }): Promise<Bed[]> => {
    const endpoint = `${Backend_CONFIG.BASE_URL}/api/beds/caregiver/${query}`;    
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch beds");
    }
  
    return await response.json();
  };
  

const api = axios.create({
  baseURL: 'https://pressureulcer.onrender.com/api',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

export default api;

// export const fetchBedDetails = async (
//   movieId: string
// ): Promise<BedDetails> => {
//   try {
//     const response = await fetch(
//       `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
//       {
//         method: "GET",
//         headers: TMDB_CONFIG.headers,
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch movie details: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     throw error;
//   }
// };


export const fetchAlerts = async ({
  userId,
  token
}: {
  userId: string;
  token: string;
}): Promise<Alert[]> => {
  const endpoint = `${Backend_CONFIG.BASE_URL}/api/alerts/caregiver/${userId}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return await response.json();
};

export const fetchBedDetails = async (
  macAddress: string
): Promise<Bed> => {
  const token = await AsyncStorage.getItem('token'); // ✅ Get token from storage

  const endpoint = `${Backend_CONFIG.BASE_URL}/api/beds/${macAddress}/details`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // ✅ Send token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bed details");
  }

  const json = await response.json()
  return json.bed;
};