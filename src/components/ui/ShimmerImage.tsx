import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

const shimmer = (w: number | undefined, h: number | undefined) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str));

const ShimmerImage = ({ src, alt, width, height, ...props }: Props) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholder='blur'
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default ShimmerImage;
