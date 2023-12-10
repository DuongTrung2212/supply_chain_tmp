import ShopItem from '@/components/Contents/Seek/ShopItem';
import TagItem from '@/components/Contents/Seek/TagItem';
import staticVariables from '@/static';
import { Avatar, Image } from 'antd';
import React from 'react';

export default function SeekPage() {
  return (
    <div className="w-full pb-[50px]">
      <div className="w-1/2 py-[10px] m-auto font-semibold text-center rounded-xl rounded-b-full bg-[#d9d9d9] md:text-[10px]">
        Nguồn gốc sản phẩm
      </div>
      <div className="px-[30px] flex flex-col gap-y-10 mt-[20px]">
        <div>
          <div className="w-1/2 py-[10px] text-center bg-[#d9d9d9] rounded-2xl my-[5px]">
            Cửa hàng
          </div>
          <ShopItem
            leftChildren={
              <div className="w-full bg-[#d9d9d9] rounded-2xl">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <TagItem label="Tên cửa hàng" value="Nguyễn Văn A" />
                  <TagItem label="asdasd" value="asdads" />
                </div>
              </div>
            }
            rightChildren={
              <div className="w-full bg-[#d9d9d9] rounded-2xl ">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <p className="text-[#4A4A4A] text-right px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px]">
                    Thông tin
                  </p>
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <div className="w-1/2 py-[10px] text-center bg-[#d9d9d9] rounded-2xl my-[5px]">
            Sản phẩm
          </div>
          <ShopItem
            leftChildren={
              <div className="w-full bg-[#d9d9d9] rounded-2xl">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <TagItem
                    label="Tên sản phẩm"
                    value="Bim bim snack siêu cay"
                  />
                  <TagItem label="asdasd" value="asdads" />
                </div>
              </div>
            }
            rightChildren={
              <div className="w-full bg-[#d9d9d9] rounded-2xl ">
                <div className="w-full flex flex-col gap-y-1 p-[10px] py-[15px]">
                  <p className="text-[#4A4A4A] text-right px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px]">
                    Thông tin
                  </p>
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                  <TagItem value="Nguyễn Văn A" />
                </div>
              </div>
            }
          />
        </div>
      </div>
      <div className="w-full relative pt-[50px] before:content-[''] before:absolute before:left-1/2 before:-translate-y-[120px] before:-translate-x-1/2 before:h-[calc(100%+120px)] before:top-0 before:w-[5px] before:bg-[#9c6161]">
        <div className="w-1/3 py-[10px] text-center bg-[#d9d9d9] rounded-e-2xl my-[5px]">
          Nguồn gốc
        </div>
        <div className="w-full flex flex-row justify-between px-[30px] relative before:content-[''] before:absolute before:w-[15px] before:h-[15px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:top-1/2 before:left-1/2 before:bg-[#9c6161]">
          <div className="w-[45%] bg-[#d9d9d9] rounded-2xl p-[10px]">
            <div className="w-full flex flex-col gap-y-1 py-[15px]">
              <TagItem label="Tên cửa hàng" value="Nguyễn Văn A" />
            </div>
            <div className="w-full flex">
              <div className="w-1/3 flex justify-center items-center">
                <Avatar
                  size={'large'}
                  src={staticVariables.noImage.src}
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3 flex flex-col gap-y-1">
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
              </div>
            </div>
          </div>
          <div className="w-[45%] bg-[#d9d9d9] rounded-2xl p-[10px]">
            <div className="w-full  py-[15px]">
              <TagItem
                label="Sản phẩm cung cấp"
                value="Nguyễn Văn Aasddddddddddddddddddddddddddddddddddddddddddd"
              />
            </div>
            <div className="w-full flex">
              <div className="w-1/3 flex justify-center items-center">
                <Avatar
                  size={'large'}
                  src={staticVariables.noImage.src}
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3 flex flex-col gap-y-1">
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
                <TagItem value="Nguyễn Văn A" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
