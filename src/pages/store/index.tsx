import { useState } from 'react';
import Image from 'next/image';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllProducts } from '@/lib';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Product } from '@/lib/get-all-products';
import type { Category } from '@/lib/get-all-categories';

export default function Home({ categories, products }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [parent] = useAutoAnimate();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.id]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== e.target.id));
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) {
      return true;
    }

    return selectedCategories.some((category) => product?.category?.slug === category);
  });

  return (
    <main>
      <div className='p-5 pb-0 border-b-2 border-[#36C6F4]'>
        <h1 className='text-center text-2xl pb-1 border-b-2 border-[#36C6F4] text-[#EB5757] uppercase font-bold'>
          Choose your category
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4'>
          {/* categories checkboxes */}
          {categories?.map((category) => (
            <div key={category.id} className='flex items-center justify-start'>
              <input type='checkbox' className='mr-2 accent-black' id={category?.slug} onChange={handleCategoryChange} />
              <label htmlFor={category?.slug} className='text-lg md:text-xl'>
                {category.name?.toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='h-56 mt-1'>
        <div className='products'>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-4 pb-12' ref={parent}>
            {filteredProducts.map((product) => (
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
                  />
                  <div className='px-4'>
                    <span className='text-xs text-gray-400'>{product.category?.name?.toUpperCase()}</span>
                    <p className='text-base'>{product?.name}</p>
                  </div>

                  <div className='px-4 -mt-8'>
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

export const getStaticProps: GetStaticProps<{ products: Product[]; categories: Category[] }> = async (context) => {
  const categoriesData = getAllCategories();
  const productsData = getAllProducts();

  const [categories, products] = await Promise.all([categoriesData, productsData]);

  if (!categories || !products) return { notFound: true };

  return {
    props: {
      categories,
      products,
    },
    revalidate: 60,
  };
};
