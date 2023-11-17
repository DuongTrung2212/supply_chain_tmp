import staticVariables from '@/static';
import { Button, ConfigProvider, Image, Statistic } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface PropsType {
  transactionId: string;
  image: string;
  productName: string;
  owner: string;
  buyQuantity: number;
  buyDay: string;
  priceTotal: number;
  onFinish?: (e: string) => void;
}

export default function TransactionSelectItem(props: PropsType) {
  const [showButton, setShowButton] = useState(false);
  return (
    <div
      onMouseOver={() => setShowButton(true)}
      onMouseOut={() => setShowButton(false)}
      className="flex relative w-full group flex-col p-[20px] hover:bg-[#ececec] rounded-xl transition-all duration-500 transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="flex gap-x-5">
        <Image
          className="object-cover rounded"
          alt=""
          width={100}
          height={100}
          src={props.image}
        />
        <div className="flex flex-col w-10/12 border-[1px] rounded">
          <p className="text-center text-xl font-medium	">{props.productName}</p>
          <div className="flex justify-around">
            <ConfigProvider
              theme={{
                components: {
                  Statistic: {
                    contentFontSize: 20,
                    titleFontSize: 13,
                  },
                },
              }}
            >
              <Statistic title="Owner" value={props.owner} />
              <Statistic title="Đã mua" value={props.buyQuantity} />
              <Statistic title="Tổng giá trị" value={props.priceTotal} />
              <Statistic
                title="Ngày mua"
                value={moment(props.buyDay).format('L')}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      {showButton && (
        <Button
          onClick={() => props.onFinish?.(props.transactionId)}
          className="m-auto absolute bottom-0 left-1/2 -translate-x-1/3 mt-[10px] w-2/3 group-hover:transition-all group-hover:duration-500 group-hover:delay-300 group-hover:transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
        >
          Chọn
        </Button>
      )}
    </div>
  );
}
