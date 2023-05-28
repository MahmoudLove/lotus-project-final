import { ShimmerImage } from '@/components/ui';
import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import Image from 'next/image';

interface Props {
  images: any[];
  width?: number;
  height?: number;
  containerHeight?: string;
  [key: string]: any;
}

const Carousel = ({ images, width, height, containerHeight, ...props }: Props) => {
  return (
    <ReactCarousel showIndicators showStatus={false} className={containerHeight} showThumbs={false}>
      {images.map((asset) => (
        <ShimmerImage src={asset?.image?.url} alt={asset?.name} width={width} height={height} key={asset?.id} {...props} />
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
