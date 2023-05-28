import { hygraphClient } from '@/lib/hygraph-client';
import { gql } from 'graphql-request';

const getAllBannersQuery = gql`
  query bannerImages {
    bannerImages {
      id
      name
      image {
        id
        url
      }
    }
  }
`;

export interface BannerImage {
  id: string;
  name: string;
  image: {
    id: string;
    url: string;
  };
}

interface BannerImages {
  bannerImages: BannerImage[];
}

const getAllBanners = async () => {
  const data = await hygraphClient.request<BannerImages>(getAllBannersQuery);

  if (!data) {
    throw new Error('Failed to fetch banner images');
  }

  return data?.bannerImages;
};

export default getAllBanners;
