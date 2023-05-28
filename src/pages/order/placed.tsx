import Link from 'next/link';

const OrderPlacedPage = () => {
  return (
    <div className='h-screen grid place-items-center text-center'>
      <div>
        <h1 className='text-6xl font-bold text-red-400'>Order Placed.</h1>
        <p className='text-gray-500 mt-2 text-2xl'>Thank you for your order!</p>
        <button className='bg-black text-white px-4 py-2 rounded-sm mt-4 transition duration-200'>
          <Link href='/'>Go back to home</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderPlacedPage;
