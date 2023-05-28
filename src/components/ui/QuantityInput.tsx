import { Dispatch, SetStateAction } from 'react';

interface Props {
  quantity: number;
  setQuantity?: any;
  isMultiple?: boolean;
  customIncrement?: any;
  customDecrement?: any;
}

const QuantityInput = ({ quantity, setQuantity, isMultiple, customIncrement, customDecrement }: Props) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    // stepper component
    <div className='flex items-center gap-2 relative border border-black w-32 px-2 h-10 '>
      <button className='flex items-center justify-center' onClick={isMultiple ? customDecrement : handleDecrement}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <input
        className='w-full text-center'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button className='text-3xl flex items-center justify-center' onClick={isMultiple ? customIncrement : handleIncrement}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  );
};

export default QuantityInput;
