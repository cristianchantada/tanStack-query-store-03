import { productsApi, type Product } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (milliseconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
};

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  await sleep(1500);

  const filterUrl = filterKey ? `category=${filterKey}` : "";

  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  await sleep(1500);

  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
};

export interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  await sleep(3500);

  // Comentar o descomentar para simular que ha habido un error al insertar el producto en el backend
  throw new Error("Error creando un producto");

  const { data } = await productsApi.post<Product>(`/products`, product);
  return data;
};
