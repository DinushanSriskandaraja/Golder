import apiClient from './apiSercive';

interface PriceResponse {
  price: number;
  exchange_rate?: number;
}

export const getCurrentPrice = async (): Promise<PriceResponse> => {
  try {
    const response = await apiClient.get('/price/current');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error fetching current price';
  }
};
export const getExchangeRate = async (): Promise<PriceResponse> => {
  try {
    const response = await apiClient.get('/price/exchange-rate');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error fetching current price';
  }
};