import { useState, useRef } from 'react';
import { useCart } from 'react-use-cart';
import { createOrder } from '@/lib';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/router';

const OrderPage = () => {
  const { items, emptyCart } = useCart();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);

    const orderData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      note: formData.get('note'),
    };

    await createOrder(orderData, items);

    emailjs.sendForm('service_gsu0yhn', 'template_i8vslo9', formRef.current!, 't7eXgh2qLxduw0UnF').then(
      (result) => {
        setLoading(false);
        emptyCart();
        router.push('/order/placed');
      },
      (error) => {
        setLoading(false);
        console.error(error.text);
      }
    );
  };

  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-2xl underline text-blue-400'>Please provide the order details:</h1>
      <form className='flex flex-col gap-6' ref={formRef} onSubmit={handleCreateOrder}>
        <div className='grid grid-cols-[40px_1fr] gap-4'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-7'
            required
          />
        </div>

        <div className='grid grid-cols-[40px_1fr] gap-4'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-7'
            required
          />
        </div>

        <div className='grid grid-cols-[40px_1fr] gap-4'>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='tel'
            name='phone'
            id='phone'
            className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-7'
            required
          />
        </div>

        <div className='grid grid-cols-[40px_1fr] gap-4'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            name='address'
            id='address'
            className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-7'
            required
          />
        </div>

        <div className='grid grid-cols-[40px_1fr] gap-4'>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            name='city'
            id='city'
            className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-7'
            required
          />
        </div>

        <div>
          <label htmlFor='note'>Note:</label>
          <textarea name='note' id='note' className='border-2 border-gray-300 w-full rounded-sm px-3 outline-none text-sm h-28' />
        </div>

        {/* order summary card with final quanity and final price */}
        <div className='bg-gray-100 p-5 rounded-md'>
          <h1 className='text-xl underline text-blue-400'>Order Summary:</h1>
          <table className='mt-2 md:mt-5'>
            <thead>
              <tr>
                <th className='text-start w-1/2 underline'>Product</th>
                <th className='text-center underline'>Quantity</th>
                <th className='text-center underline'>Price</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {items.map((item) => (
                <tr key={item.id} className='h-16 border-b '>
                  <td className='text-start'>{`${item.name} ${item?.size} (${item?.fragrance})`}</td>
                  <td>{item.quantity}</td>
                  <td>{item.itemTotal}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className='h-10 md:h-12'>
                <td className='text-start'>Total:</td>
                <td></td>
                <td className='font-bold'>{items.reduce((acc, item) => acc + Number(item.itemTotal), 0)} EGP</td>
              </tr>

              <tr className='h-16'>
                <td colSpan={3} className='text-red-700 text-start md:text-center'>
                  ** The shipping fees will be added according to your address
                </td>
              </tr>

              <tr className='h-10'>
                <td colSpan={3} className='text-red-700 text-start md:text-center'>
                  ** We will contact you to confirm your order
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className='flex w-full mb-10'>
          <button
            className='bg-black text-white px-4 py-4 rounded-sm w-full flex items-center justify-center'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <svg
                className='animate-spin mr-2 h-5 w-5 text-white text-center'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth={4}></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-7.938A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z'
                ></path>
              </svg>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
