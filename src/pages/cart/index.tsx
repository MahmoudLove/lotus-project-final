import Image from 'next/image';
import QuantityInput from '@/components/ui/QuantityInput';
import { useCart } from 'react-use-cart';
import CartImage from '@public/cart.png';
import ShoppingCart from '@public/shopping_cart.webp';
import Link from 'next/link';

const CartPage = () => {
  const { items, updateItemQuantity, removeItem } = useCart();

  if (!items?.length) {
    return (
      <div className='grid place-items-center h-screen -mt-10'>
        <div className='flex flex-col items-center'>
          <Image src={CartImage} alt='cart' width={400} height={400} objectFit='contain' />
          <h1 className='text-4xl'>Your cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4'>
      <h1 className='text-2xl p-5 underline -mb-4 w-full'>Your Cart:</h1>
      {items?.map((item) => (
        //  item card
        <div key={item.id} className='flex items-center border-b-2 pb-2 mt-6 w-full gap-4'>
          <div>
            <Image src={item.image} alt={item.name} width={130} height={130} objectFit='contain' priority className='md:w-40' />
          </div>
          <div className='flex flex-col gap-3 md:text-xl'>
            <h3>
              {item.name}
              {item.size && ` - ${item.size}`}
              {item.fragrance && ` - (${item.fragrance} fragrance)`}
            </h3>
            <p>{Number(item.price) * Number(item.quantity)} EGP</p>
            <div className='grid grid-cols-2 md:mt-2'>
              <QuantityInput
                quantity={item.quantity as number}
                customIncrement={() => {
                  updateItemQuantity(item.id, Number(item?.quantity) + 1);
                }}
                customDecrement={() => {
                  updateItemQuantity(item.id, Number(item?.quantity) - 1);
                }}
                isMultiple
              />
              {/* remove from cart */}
              <button
                className='text-red-500 ml-auto'
                onClick={() => {
                  removeItem(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Total card */}
      <div className='flex flex-col items-center border-2 border-gray-600 mt-6 gap-4 p-10 md:px-16 md:mx-10'>
        <div className='flex items-center justify-between w-full'>
          <Image src={ShoppingCart} alt='cart' width={100} height={130} objectFit='contain' />

          <div>
            <h3 className='text-2xl'>Total:</h3>
            <p className='text-2xl font-bold'>
              {items?.reduce((acc, item) => {
                return acc + Number(item.price) * Number(item.quantity);
              }, 0)}{' '}
              EGP
            </p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Link href='/order' className='bg-mainBlue text-white text-center px-5 py-3 w-full mt-8'>
            Checkout
          </Link>
          <Link href='/' className='bg-black text-white px-5 py-3 w-full  text-center'>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
