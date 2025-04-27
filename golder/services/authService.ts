import apiClient from "./apiSercive"; // Assuming this is your API client (e.g., Axios instance)
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define interfaces for request and response
export interface UserCredentials {
  nic: string;
  name: string;
  email: string;
  address: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}

// Login function
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    const data = response.data;
    console.log(data);

    // Store token in AsyncStorage
    if (data.token) {
      await AsyncStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error: any) {
    throw error.response?.data || "Error during login";
  }
};

// Signup function
export const signup = async (
  credentials: UserCredentials
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post("/auth/signup", credentials);
    const data = response.data;

    // Store token in AsyncStorage
    if (data.token) {
      await AsyncStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error: any) {
    throw error.response?.data || "Error during signup";
  }
};

// Optional: Logout function
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error: any) {
    throw error || "Error during logout";
  }
};

// Optional: Check if authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return !!token;
  } catch (error: any) {
    throw error || "Error checking authentication status";
  }
};
