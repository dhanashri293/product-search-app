// product.state.ts
export interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
  lastUpdated: null
};