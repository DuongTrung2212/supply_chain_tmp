import staticVariables from '@/static';
import { Image } from 'antd';
import React, { ReactNode } from 'react';

interface Props {
  alignRight: boolean;
  image: string;
  label: string;
  description: ReactNode | string;
}

export default function HomeDescription({
  alignRight,
  image,
  label,
  description,
}: Props) {
  return (
    <div
      data-aos="fade-up"
      className={`flex w-full ${
        alignRight ? 'flex-row-reverse' : ''
      } justify-around items-center px-[100px]`}
    >
      <div className={`w-1/2`}>
        <p className={`text-5xl py-[20px]`}>{label}</p>
        <p>{description}</p>
      </div>
      <Image
        width={400}
        height={350}
        preview={false}
        className={`object-cover rounded-xl m-auto`}
        alt=""
        src={image}
      />
    </div>
  );
}
