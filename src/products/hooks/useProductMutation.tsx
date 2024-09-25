import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    // Para hacer las actualizaciones optimistas
    onMutate: (product) => {
      //data aquí es el producto que estamos enviando el back

      // Product optimista: (le generamos un id ficticio que no es el que devolverá la BD,
      // ya que en este punto no sabemos cuál nos dará, pero asegurándonos que no existe en la BD,
      // en este caso es decimal y sabemos que en la BD solo hay enteros)
      const optimisticProduct = { id: Math.random(), ...product };

      // Almacenar el producto en el caché del queryClient

      queryClient.setQueryData<Product[]>(
        ['products',{ filterKey: product.category }],
        (old) => {
          if ( !old ) return [optimisticProduct];

          return [...old, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },

    onSuccess: (product, _variables, context) => {
      //? product es el resultado de la petición, es decir, en este caso el nuevo producto creado con su id de la BD

      //* el context es la información que nos regresa el onMutate(), es decir, lo que metamos en el return del OnMutate()

      //* Las variables es la información que le enviamos a la promesa, en nuestro caso, los datos del producto

      // Invalidar la data si la petición sale bien para que con el nuevo producto se realice
      // una nueva petición y este ya se muestre:

      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // });

      // opcionalmente borramos la queryKey del producto optimista:
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product];

          // Aquí devolvemos el product (lo insertado satisfactoriamente en la BD) en lugar
          //  del optimisticProduct (lo sacamos con el map() ) + el resto de productos que ya había en caché
          return oldData.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      //* en error viene entre otros, el mensaje de error al haber hecho el throw new error.
      //? en _variables y context viene lo mismo que en onSuccess().

      // es lo mismo que hacemos en el onSuccess de eliminar la query propia del optimistic ["producto", idFicticio]:
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      // setQueryData() semejante al de onSuccess:
      // aquí tomamos el producto de las variables, porque no nos llega la data como primer parámetro a diferencia
      // del onSuccess
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (oldData) => {
          if (!oldData) return [];

          // Aquí hacemos un filter para eliminar el producto optimista (dejamos pasar todos excepto el optimista)
          return oldData.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
    onSettled: () => {},
  });

  return mutation;
};
