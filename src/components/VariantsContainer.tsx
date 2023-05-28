import { Dispatch } from 'react';

interface Props {
  uniqueVariants: any;
  selectedVariant: any;
  setSelectedVariant: Dispatch<any>;
}

const VariantsContainer = ({ uniqueVariants, selectedVariant, setSelectedVariant }: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='mt-1 flex flex-col gap-1'>
        {uniqueVariants?.map((variant: any) => (
          <div key={variant.id} className='flex flex-col gap-2 mt-4'>
            <span className='border-b-2 border-black pb-1 md:text-xl'>{variant.name}</span>
            <div className='flex gap-10 justify-start mt-1'>
              {variant?.variants?.map((v: any) => (
                <button
                  key={v.id}
                  className={`h-14 w-14 ${
                    selectedVariant?.id === v.id ? 'bg-black text-white' : 'bg-white text-black'
                  } border-2 border-black p-1`}
                  onClick={() => setSelectedVariant(v)}
                >
                  {v.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsContainer;
