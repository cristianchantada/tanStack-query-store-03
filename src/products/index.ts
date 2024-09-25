export { productsApi } from "./api/productsApi";

export { ProductCard } from "./components/ProductCard";
export { ProductList } from "./components/ProductList";

export { usePrefetchProduct } from "./hooks/usePrefetchProduct";
export { useProduct } from "./hooks/useProduct";
export { useProductMutation } from './hooks/useProductMutation';
export { useProducts } from "./hooks/useProducts";

export type { Product } from "./interfaces/product";

export { StoreLayout } from "./layout/StoreLayout";

export { CompleteListPage } from "./pages/CompleteListPage";
export { MensPage } from "./pages/MensPage";
export { NewProduct } from "./pages/NewProduct";
export { ProductById } from "./pages/ProductById";
export { WomensPage } from "./pages/WomensPage";

export * as productActions from "./services/actions";
