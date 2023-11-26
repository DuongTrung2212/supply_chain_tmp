import instanceAxios from '@/api/instanceAxios';
import currency from '@/services/currency';
import {
  faCircleXmark,
  faLock,
  faLockOpen,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Image, Row, Segmented, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

interface Product {
  id: string;
  product_type: string;
  product_status: string;
  name: string;
  description: string;
  price: number;
  last_price: number | null;
  quantity: number;
  number_of_sales: number;
  is_sale: boolean;
  banner: string;
  created_by: string;
  tx_hash: string;
  view: number;
  created_at: string;
  detail_description: any[]; // Type depends on the actual content
  classify_goods: any[]; // Type depends on the actual content
  user: {
    id: string;
    avatar: string;
    username: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    system_role: string;
    address_wallet: string;
  };
}

interface TransactionType {
  id: string;
  product_id: string;
  user_id: string;
  price: number;
  quantity: number;
  status: string;
  receiver: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string | null;
  tx_hash: string;
  product: Product;
  user: {
    id: string;
    avatar: string | null;
    username: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    system_role: string;
    address_wallet: string;
  };
}

export default function TransactionStatus() {
  const [currentTable, setCurrentTable] = useState('BUY');
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listTransaction, setListTransaction] = useState<TransactionType[]>([]);

  const fetchDataTransaction = useCallback(async () => {
    setLoading(true);
    await instanceAxios.get(`product/order_product/get?skip=${skip - 1}&limit=${limit}`)
      .then((res) => {
        console.log(res.data.data.list_transaction_sf);
        setTransactionTotal(res.data.data.total_transaction);
        const newListTransaction = [...res.data.data.list_transaction].map(
          (item, index) => ({ key: (skip - 1) * limit + index + 1, ...item })
        );
        setListTransaction(newListTransaction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, skip]);
  useEffect(() => {
    fetchDataTransaction();
  }, [fetchDataTransaction]);
  const updateStatusTransaction =async (status:string) => {
    await instanceAxios.get(``)
  }
  const columns: ColumnsType<TransactionType> = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'user.full_name',
      render: (value, record, index) => record.user?.full_name
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product.name',
      render: (value, record, index) => record.product?.name,
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá đơn vị',
      dataIndex: 'price',
      render: (value, record, index) => `${value.toLocaleString()} ${currency}`,
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'total',
      render: (value, record, index) =>
        `${(
          (record.price || 0) * (record.quantity || 0)
        ).toLocaleString()} ${currency}`,
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      render: (value, record, index) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value, record, index) =>
        record.status === "DONE" ? (
          <Tag color={'success'}>Thành công</Tag>
        ) : (record.status === "PENDING" ? (
            <Tag color={'warning'}>Đang chờ giao hàng</Tag>
          ) : (
            <Tag color={'error'}>Giao hàng không thành công</Tag>
          )
        ),
    },
    {
      title: 'Cập nhật trạng thái',
      render: (value, record, index) => (record.status==="PENDING" &&(
        <div>
          <Tag color={'success'} onClick={() => updateStatusTransaction("DONE")}>
            Giao hàng thành công
          </Tag>
          <Tag color={'error'} onClick={() => updateStatusTransaction("REJECT")}>
            Giao hàng thất bại 
          </Tag>
        </div>
      )),
    },

  ];
  // const data: DataType[] = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     key: i,
  //     user: 'ReactNode',
  //     productName: 'string',
  //     quantity: 12,
  //     price: 2312,
  //     total: 131,
  //     date: 'string',
  //     status: 'string',
  //   });
  // }
  return (
    <div>
      <div className="flex  items-center justify-between p-[20px] border-[1px] rounded-[10px]">
        <p className="text-3xl font-medium	">Danh sách sản phẩm</p>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={listTransaction}
          pagination={{
            onChange: (e) => {
              setSkip(e - 1);
            },
            current: skip,
            pageSize: 10,
            total: transactionTotal,
            position: ['bottomCenter'],
          }}
          scroll={{ y: 340 }}
        />
      </div>
    </div>
  );
}
