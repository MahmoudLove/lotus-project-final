import Image from 'next/image';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllBanners, getAllProducts } from '@/lib';
import { Carousel } from '@/components/ui';
import type { Product } from '@/lib/get-all-products';
import type { BannerImage } from '@/lib/get-all-banners';

export default function Home({ banners, products }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div className='h-56 md:h-72'>
        <Carousel
          images={banners}
          width={365}
          height={20}
          className='max-h-44 md:max-h-64 lg:max-h-80 xl:max-h-96'
          containerHeight='h-[154px] md:h-[230px] lg:h-[300px] xl:h-[400px]'
        />

        <div className='mt-10'>
          <h1 className='px-4 text-2xl underline xl:text-3xl'>All Products</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-4 pb-12'>
            {products.map((product) => (
              <Link href={`/products/${product?.slug}`} key={product.id}>
                <div className='grid auto-rows-[180px_110px_0px] md:auto-rows-[230px_90px_0px] lg:auto-rows-[300px_100px_0px] xl:auto-rows-[300px_90px_0px] grid-cols-1 shadow-xl h-[350px] md:h-[380px] lg:h-[450px] xl:h-[480px] gap-5'>
                  <Image
                    src={product.image.url}
                    alt={product.image.url}
                    width={350}
                    height={100}
                    placeholder='blur'
                    blurDataURL='data:image/webp;base64,UklGRlIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggZAEAALANAJ0BKokAiQA+7WSoTbo0qKYul8y7QB2JZ27gOEjf0R59QeYkPwbIEq79OvQEcy8pi/sXSEbyFER9oGR4E71U1lySnyMNRThCD+Ci+mYwOywxjbAaBaKxf1AlecN/1KX7cUlxtl35P6/1/lak5vcAxb99MBgA/vDQ0qoNh4QigGbZIMX3uRDXuwLn6c/7SEOqqvMBUWhkGmLj2z2gopn++l6DAZF1MXos/vYZi9VkE1xkEhiT5s7P5xLcM+RG/bS3LafvQ/zNnUlbmTGpMGSJFOnPTCcFm3Hoa65bQRTYuaefz+tS07j1OWVR1V2oCnSeSjQXY0Zt2MMpRy0IiPQllebUWNx9egyZxNgSi8H2fgOGzFc0VbYl39KCqHV7bq+t+DZmHbhxlXEkVZTODhwnS5G9Feha/aVrx2Gmg58u7ujqV1pRWObntTUB7rS1dMmM+E838QJa0YcyDQd8AEd4W0AA'
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                    className='object-cover pt-5 md:pt-0 xl:mx-auto'
                  />
                  <div className='px-4 xl:pt-8'>
                    <span className='text-xs text-gray-400'>{product.category?.name?.toUpperCase()}</span>
                    <p className='text-base lg:text-xl'>{product?.name}</p>
                  </div>

                  <div className='px-4 -mt-6 xl:mt-2'>
                    {product.productVariants?.length === 1 ? (
                      <p className='text-base font-bold'>
                        {product?.productVariants?.[0]?.price} {product?.productVariants?.[0]?.currency}
                      </p>
                    ) : (
                      <p className='text-base'>Configurable</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<{ products: Product[]; banners: BannerImage[] }> = async (context) => {
  const bannersData = getAllBanners();
  const productsData = getAllProducts();

  const [banners, products] = await Promise.all([bannersData, productsData]);

  if (!banners || !products) return { notFound: true };

  return {
    props: {
      banners,
      products,
    },
    revalidate: 60,
  };
};
