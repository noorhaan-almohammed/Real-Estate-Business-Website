import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  listing_price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  build_year: string;
  description: string;
  feature_description: string;
  tag_description: string;
  down_payment: number;
  mortgage_amount: number;
  mortgage_fees: string;
  monthly_taxes: number;
  expense_taxes: number;
  expense_mortgage: string;
  expense_insurance: number;
  legal_fees: number;
  transfer_tax: number;
  inspection: number;
  insurance: number;
  hoa_fee: number;
  total_additional_fees: number;
  features: string[];
  imageUrls: string[];
  updatedAt?: any;
  createdAt: any;
}

interface PropertiesState {
  items: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  items: [],
  loading: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProperties, setLoading, setError } = propertiesSlice.actions;
export default propertiesSlice.reducer;
