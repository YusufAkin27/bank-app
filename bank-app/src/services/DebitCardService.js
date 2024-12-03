import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/bank';

// Debit card creation function
const create = async (data) => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Send the request with the data in the body
        const response = await axios.post(
            `${API_URL}/cards/debitCard/add`,
            data,  // Directly send the data as the body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in headers
                },
            }
        );

        return response.data; // Return the response data
    } catch (error) {
        // Return error message if something goes wrong
        return { success: false, message: error.message || 'Hesap açılırken bir sorun oldu' };
    }
};

// Get all accounts function

const getAllDebitCards = async () => {
    try {
        // Retrieve the token from cookies
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error("Token bulunamadı. Lütfen giriş yapın.");
        }

        // Send the request to get all debit cards
        const response = await axios.get(
            `${API_URL}/cards/debitCard/getAll`, // Updated endpoint for getting all debit cards
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in headers
                },
            }
        );

        // Return the response data, which should be a list of debit cards
        if (response.data) {
            return { success: true, data: response.data }; // Return success response with data
        } else {
            throw new Error('Kartlar alınırken bir sorun oldu');
        }

    } catch (error) {
        // Handle error and return error message
        return { success: false, message: error.response?.data?.message || error.message || 'Kartlar alınırken bir sorun oldu' };
    }
};




export { create, getAllDebitCards};
