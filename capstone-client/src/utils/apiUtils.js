import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const postName = async (accomplishment, name) => {
    const newPost = {
      name,
      accomplishment,
    };

    try {
      await axios.post(`${baseUrl}/wall-of-fame`, newPost);
    } catch (error) {
      console.error("There was a problem with posting your name.", error);
    }
  };

export const fetchWallOfFame = async (setWallOfFame) => {
            try {
              const response = await axios.get(`${baseUrl}/wall-of-fame`);
              setWallOfFame(response.data);
            } catch (error) {
              console.error("There was a problem retrieving the Wall of Fame data:", error);
            }
          };
  