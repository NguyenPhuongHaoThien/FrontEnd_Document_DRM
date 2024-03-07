// src/services/SearchService.js

import axios from "../services/axios.js";

export const fetchSearchSuggestions = async (searchTerm, price, category) => {
    try {
        const response = await axios.get(`/home/search`, {
            params: {
                searchTerm,
                price,
                category,
                page: 0,
                size: 3
            }
        });
        return response.data.content;
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        throw error;
    }
};