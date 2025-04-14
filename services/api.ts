import axios from 'axios';

export const Backend_CONFIG = {
    BASE_URL: "http://127.0.0.1:3000/docs#/default/",
    headers: {
      "Content-Type": "application/json",
    },
  };
//   http://127.0.0.1:3000/docs#/default/return_bed_get_beds_get
  export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  
  export const fetchBed = async ({
    query,
  }: {
    query: string;
  }): Promise<Bed[]> => {
    console.log('Here')
    const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
      console.log('Here')
    
    // axios.
    // get(endpoint).then((response)=>{
    //     const res = response.data 
    // })
    // const response = await axios.get(endpoint);
    // return response.data.results;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    console.log('Here')
    if (!response.ok) {
      throw new Error(`Failed to fetch beds: ${response.statusText}`);
    }
  
    const data = await response.json();
    
    return data.results;
    
  };
  
