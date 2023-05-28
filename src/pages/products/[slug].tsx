import { useEffect, useState, useRef } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import type { Product } from '@/lib/get-all-products';
import { getProductBySlug, getAllProducts } from '@/lib';
import Image from 'next/image';
import VariantsContainer from '@/components/VariantsContainer';
import QuantityInput from '@/components/ui/QuantityInput';
import { useCart } from 'react-use-cart';
import perfumeIcon from '@public/bottle.png';

interface PathsType {
  params: {
    slug: string;
  };
}

const ProductPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addItem, inCart, updateItemQuantity, updateItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const fragranceRef = useRef<HTMLInputElement>(null);

  const uniqueVariantNames = product?.productVariants?.reduce((acc: any, variant: any) => {
    const variationExists = acc.find((v: any) => v.name === variant.variation.name);

    if (!variationExists) {
      acc.push(variant.variation);
    }

    return acc;
  }, []);

  const uniqueVariants = uniqueVariantNames?.map((v: any) => {
    const variants = product?.productVariants.filter((variant: any) => variant.variation.name === v.name);

    return {
      id: v.id,
      name: v.name,
      variants,
    };
  });

  useEffect(() => {
    if (product?.productVariants?.length > 1) {
      return setSelectedVariant(product?.productVariants?.[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedVariant) {
      return setTotalPrice(Number(selectedVariant?.price) * Number(selectedQuantity));
    }

    setTotalPrice(Number(selectedQuantity) * Number(product.productVariants?.[0]?.price));
  }, [selectedVariant, selectedQuantity]);

  const handleAddToCart = () => {
    if (selectedVariant || product?.id === 'clgntdhhsg0y00burbieggrqt') {
      if (inCart(selectedVariant?.id) || inCart('clgntdhhsg0y00burbieggrqt')) {
        const itemId = selectedVariant?.id ?? 'clgntdhhsg0y00burbieggrqt';

        return updateItem(itemId, {
          quantity: selectedQuantity,
          fragrance: fragranceRef.current?.value,
        });
      }

      return addItem(
        {
          id: selectedVariant?.id ?? 'clgntdhhsg0y00burbieggrqt',
          name: product.name,
          size: selectedVariant?.value ?? 'Regular',
          fragrance: fragranceRef.current?.value,
          price: selectedVariant?.price ?? product.productVariants?.[0]?.price,
          image: product.image.url,
        },
        selectedQuantity
      );
    }

    if (inCart(product.productVariants?.[0]?.id)) {
      updateItemQuantity(product.productVariants?.[0]?.id, selectedQuantity);
    }

    addItem(
      {
        id: product.productVariants?.[0]?.id,
        name: product.name,
        price: product.productVariants?.[0]?.price,
        image: product.image.url,
      },
      selectedQuantity
    );
  };

  return (
    <section className='p-7 md:p-16'>
      <Image
        src={product?.image.url}
        alt={product?.image.url}
        width={350}
        height={300}
        placeholder='blur'
        blurDataURL='data:image/webp;base64,UklGRlIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggZAEAALANAJ0BKokAiQA+7WSoTbo0qKYul8y7QB2JZ27gOEjf0R59QeYkPwbIEq79OvQEcy8pi/sXSEbyFER9oGR4E71U1lySnyMNRThCD+Ci+mYwOywxjbAaBaKxf1AlecN/1KX7cUlxtl35P6/1/lak5vcAxb99MBgA/vDQ0qoNh4QigGbZIMX3uRDXuwLn6c/7SEOqqvMBUWhkGmLj2z2gopn++l6DAZF1MXos/vYZi9VkE1xkEhiT5s7P5xLcM+RG/bS3LafvQ/zNnUlbmTGpMGSJFOnPTCcFm3Hoa65bQRTYuaefz+tS07j1OWVR1V2oCnSeSjQXY0Zt2MMpRy0IiPQllebUWNx9egyZxNgSi8H2fgOGzFc0VbYl39KCqHV7bq+t+DZmHbhxlXEkVZTODhwnS5G9Feha/aVrx2Gmg58u7ujqV1pRWObntTUB7rS1dMmM+E838QJa0YcyDQd8AEd4W0AA'
        style={{
          width: 'auto',
          height: 'auto',
        }}
        priority
        className='object-contain mx-auto lg:!w-96'
      />

      <h1 className='text-3xl font-bold mt-5 lg:mt-7'>{product.name}</h1>
      <div className='mt-5 flex flex-col gap-1'>
        <span className='border-b-2 border-black pb-1 md:text-xl'>Details</span>
        <p className='text-gray-400 mt-1 text-lg'>{product.description}</p>
      </div>

      {(product.productVariants.length > 1 || product.id === 'clgntdhhsg0y00burbieggrqt') && (
        <div className='relative'>
          <Image src={perfumeIcon} alt='perfume field placeholder' className='absolute top-[23px] md:top-[25px]' />
          <input
            type='text'
            placeholder='Fragrance name'
            className='
        border-b-2 border-gray-600 pb-1 mt-5 outline-none w-full px-5 text-sm md:text-base
      '
            required
            ref={fragranceRef}
          />
        </div>
      )}

      {product.productVariants.length > 1 && (
        <VariantsContainer
          uniqueVariants={uniqueVariants}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      )}

      <div className='flex items-center justify-between mt-10 px-1'>
        <div className='flex flex-col gap-2'>
          <span className='uppercase'>Quantity</span>
          <QuantityInput quantity={selectedQuantity} setQuantity={setSelectedQuantity} />
        </div>

        <div className='flex flex-col'>
          <span className='uppercase'>Total Price</span>
          {product.productVariants.length > 1 ? (
            <span className='text-2xl font-bold'>
              {isNaN(totalPrice) ? '---' : totalPrice} {selectedVariant?.currency}
            </span>
          ) : (
            <span className='text-2xl font-bold'>
              {isNaN(totalPrice) ? '---' : totalPrice} {product.productVariants?.[0]?.currency}
            </span>
          )}
        </div>
      </div>

      <button className='bg-black text-white px-5 py-3 w-full mt-8 lg:py-4' onClick={handleAddToCart}>
        Add to cart
      </button>
    </section>
  );
};

export const getStaticPaths = async () => {
  let paths: PathsType[] = [];

  const products = await getAllProducts(5);

  if (products) {
    paths = [
      ...paths,
      ...products.map((product) => ({
        params: { slug: product.slug },
      })),
    ];
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async (context) => {
  const slug = context?.params?.slug as string;
  const product = await getProductBySlug(slug);

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};

export default ProductPage;
