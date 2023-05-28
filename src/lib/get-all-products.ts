import { hygraphClient } from '@/lib/hygraph-client';
import { gql } from 'graphql-request';
import { handleError } from '@/lib';

const getAllProductsQuery = gql`
  query fetchProducts($first: Int) {
    products(first: $first) {
      id
      name
      slug
      category {
        id
        name
        slug
      }
      image {
        id
        url
      }
      productVariants {
        id
        price
        currency
      }
    }
  }
`;

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  image: {
    id: string;
    url: string;
  };
  productVariants: ProductVariant[];
}

interface ProductVariant {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  variation: {
    id: string;
    name: string;
  };
  value?: string | null;
}

interface Products {
  products: Product[];
}

const getAllProducts = async (first?: number) => {
  try {
    const data = await hygraphClient.request<Products>(getAllProductsQuery, {
      first,
    });

    return data?.products;
  } catch (error: any) {
    handleError(error, 'fetch all products');
  }
};

export default getAllProducts;
