import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Profile edit function
export const editProfile = async (data) => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Send the request with the data in the body
        const response = await axios.put(
            `${API_URL}/customers/edit-profile`,
            data,  // Directly send the data as the body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in headers
                    "Content-Type": "application/json", // Specify JSON format
                },
            }
        );

        return response.data; // Return the response data
    } catch (error) {
        // Handle error response and display error message from backend if available
        return { 
            success: false, 
            message: error.response?.data?.message || error.message || 'Profil bilgileri güncellenirken bir sorun oldu' 
        };
    }
};

// Profile retrieval function
export const getProfile = async () => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Send the GET request with headers
        const response = await axios.get(
            `${API_URL}/customers/getProfile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in headers
                },
            }
        );

        return response.data; // Return the response data
    } catch (error) {
        // Handle error response and display error message from backend if available
        return { 
            success: false, 
            message: error.response?.data?.message || error.message || 'Profil bilgileri alınırken bir sorun oldu' 
        };
    }
};
