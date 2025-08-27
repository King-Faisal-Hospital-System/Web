import axios from "axios";

export interface Stock {
  _id: string;
  name: string;
  product_name: string;
  batch_number: string;
  category: string;
  form: string;
  supplier?: string;
  expiry_date?: string;
  quantity: number;
  unit_price: number;
  total_value: number;
  status: "GOOD" | "LOW";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/stocks";

// Fetch all stocks
export const fetchAllStocks = async (): Promise<Stock[]> => {
  const res = await axios.get(API_URL);
  return res.data.stocks;
};

// Create a new stock
export const createStock = async (stockData: any) => {
  const res = await axios.post(API_URL, stockData);
  return res.data;
};

// Receive stock
export const receiveStock = async (stockId: string, data: { orderId: string, batch_number: string, quantity_received: number, notes: string }) => {
  const res = await axios.patch(`${API_URL}/receive/${stockId}`, data);
  return res.data;
};

// Issue stock
export const issueStockAPI = async (stockId: string, data: { requestor: string, quantity: number, remark: string }) => {
  const res = await axios.patch(`${API_URL}/issue/${stockId}`, data);
  return res.data;
};
