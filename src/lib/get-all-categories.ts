import { hygraphClient } from '@/lib/hygraph-client';
import { gql } from 'graphql-request';
import handleError from './handleError';

const getAllCategoriesQuery = gql`
  query fetchCategories {
    categories {
      id
      name
      slug
    }
  }
`;

export interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Categories {
  categories: Category[];
}

const getAllCategories = async () => {
  try {
    const data = await hygraphClient.request<Categories>(getAllCategoriesQuery);

    return data?.categories;
  } catch (error) {
    handleError(error, 'fetch all categories');
  }
};

export default getAllCategories;
