import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/logo.png';
import { useCart } from 'react-use-cart';

const Header = () => {
  const { totalItems = 0 } = useCart();
  return (
    <header className='h-7 md:h-10 bg-mainBlue flex items-center justify-between px-2'>
      <Image src={Logo} alt='lotus store logo' className='w-8 md:w-10' />

      <nav>
        <ul className='flex text-white gap-3 uppercase text-xs items-center md:text-sm md:gap-6'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/store'>Store</Link>
          </li>
          <li>
            <Link href='/'>Contact Us</Link>
          </li>
        </ul>
      </nav>

      <div className='relative pr-3'>
        <Link href='/cart'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#fff'
            className='w-5 h-5 md:w-7 md:h-7'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
        </Link>
        <span className='absolute top-2.5 md:top-4 right-1.5 text-black font-bold text-[10px] md:text-xs'>
          <span>{totalItems}</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
