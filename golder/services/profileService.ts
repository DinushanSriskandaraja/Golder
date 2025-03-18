import apiClient from './apiSercive';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define interface for profile data
interface Profile {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Fetch profile details
export const getProfile = async (): Promise<Profile> => {
  try {
    // Ensure token is available
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await apiClient.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error fetching profile details';
  }
};

// Update profile details (optional, if your API supports it)
export const updateProfile = async (profileData: Partial<Profile>): Promise<Profile> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await apiClient.put('/profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error updating profile details';
  }
};