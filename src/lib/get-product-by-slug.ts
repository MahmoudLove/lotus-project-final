import { hygraphClient, gql } from '@/lib/hygraph-client';
import type { Product } from '@/lib/get-all-products';
import handleError from './handleError';

const getProductBySlugQuery = gql`
  query fetchProductBySlug($slug: String) {
    products(where: { slug: $slug }) {
      id
      name
      description
      image {
        id
        url
      }
      category {
        id
        name
      }
      productVariants {
        id
        name
        quantity
        price
        currency
        variation {
          id
          name
        }
        value
      }
    }
  }
`;

interface ProductBySlug {
  products: Product[];
}

const getProductBySlug = async (slug: string) => {
  try {
    const data = await hygraphClient.request<ProductBySlug>(getProductBySlugQuery, {
      slug,
    });

    return data?.products?.[0];
  } catch (error) {
    handleError(error, 'fetch product by slug');
  }
};

export default getProductBySlug;
