'use client';
import staticVariables from '@/static';
import {
  DeleteTwoTone,
  EditTwoTone,
  EllipsisOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  MailOutlined,
  MinusCircleOutlined,
  MinusSquareFilled,
  MinusSquareOutlined,
  PhoneOutlined,
  PicLeftOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  PlusSquareFilled,
  PlusSquareOutlined,
  SearchOutlined,
  SendOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Modal,
  Popconfirm,
  Popover,
  QRCode,
  Row,
  Segmented,
  Space,
  Table,
  Tag,
  Timeline,
  Tooltip as TooltipAntd,
  Typography,
  Upload,
  UploadFile,
  notification,
} from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faCartShopping,
  faCircleCheck,
  faEnvelope,
  faMobileScreenButton,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import GrowUpItem from '@/components/Contents/ProductInfo/GrowUpItem';
import Paragraph from 'antd/es/typography/Paragraph';
import CommentItem from '@/components/Contents/ProductInfo/CommentItem';
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import CommentInput from '@/components/Contents/common/CommentInput';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import CreateDescriptionForm from '@/components/Contents/ProductInfo/CreateDescriptionForm';
import { UploadChangeParam } from 'antd/es/upload';
import useSWR, { useSWRConfig } from 'swr';
import InputNumberCustom from '@/components/Contents/common/InputCustom/InputNumberCustom';
import { Chart } from '@/components/CMS/Statistical/Chart';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import Owner from './components/Owner';
import ProductOrigin from './components/PoductOrigin';
import currency from '@/services/currency';
import Description from '@/components/Contents/ProductInfo/Description';
import useLogin from '@/services/requireLogin';
import ChainItem from './components/ChainItem';

export default function MarketInfo({
  params,
}: {
  params: { marketId: string };
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openCreateDescriptionModal, setOpenCreateDescriptionModal] =
    useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataMarket, setDataMarket] = useState<MarketType>({});
  const [dataOwner, setDataOwner] = useState<UserType>({});
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [dataHistory, setDataHistory] = useState<HistoryType>({});
  const [dataChart, setDataChart] = useState({});
  const [dataGrowUp, setDataGrowUp] = useState<GrowUpType[]>([]);
  const [dataListTransaction, setDataListTransaction] = useState<
    TransactionType[]
  >([]);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [changePageRight, setChangePageRight] = useState('COMMENT');
  const [generalAndProvider, setGeneralAndProvider] = useState('GENERAL');
  const [isOwner, setIsOwner] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState(0);
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [showModalPay, setShowModalPay] = useState(false);
  const currentUser = useAppSelector((state) => state.user.user);
  const { mutate } = useSWRConfig();
  const { login } = useLogin();
  console.log("list transaction:" ,dataListTransaction);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: 'Thống kê hoạt động của sản phẩm vừa qua',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const labels = Object.keys(dataChart).map(
    (item: any, index) => `Tháng ${item}`
  );

  const dataChartProps = {
    labels,
    datasets: [
      {
        label: 'Số lượng giao dịch',
        data: Object.values(dataChart).map(
          (item: any, index) => item.count_number_of_sale
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Số lượng sản phẩm bán ra',
        data: Object.values(dataChart).map(
          (item: any, index) => item.total_quantity
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const fethMarket = async () => {
    await instanceAxios
      .get(`marketplace/${params.marketId}`)
      .then(async (res) => {
        setDataMarket(res.data.data);
        if (res.data.data.order_type === 'FARMER') {
          fetchListGrowUp(res.data.data.order_id);
          fetchDataTransaction('transaction_fm', res.data.data.order_id);
        }
        if (res.data.data.order_type === 'SEEDLING_COMPANY')
          fetchDataTransaction('transaction_sf', res.data.data.order_id);
        await instanceAxios
          .get(`product/${res.data.data.order_id}`)
          .then((res) => {
            console.log('marketplace', res.data.data);
            setDataProduct(res.data.data);
          })
          .catch((err) => console.log('asdadasd'));

        await instanceAxios
          .get(`product/${res.data.data.order_id}/history`)
          .then((res) => {
            if (res.data.data.product) {
              setDataHistory(res.data.data);
            } else setDataHistory({ product: res.data.data });
          })
          .catch((err) => console.log('asdadasd'));

        await instanceAxios
          .get(`product/${res.data.data.order_id}/chart`)
          .then((res) => {
            setDataChart(res.data.data);
          })
          .catch((err) => console.log('asdadasd'));

        await instanceAxios
          .get(`user/${res.data.data.order_by}/get_user`)
          .then((res) => setDataOwner(res.data.data))
          .catch((err) => console.log('asdadasd'));
        fetchDataComment();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPage(false));
  };
  const fetchAddCartItem = async () => {
    await instanceAxios
      .post(`cart/create`, {
        product_id: dataProduct.id,
        quantity: buyQuantity || 1,
        price: buyQuantity * (dataProduct.price || 0) || dataProduct.price,
      })
      .then((res) => {
        mutate('cart/list');
        notification.success({
          message: 'Thành công',
          description: 'Đã thêm vào giỏ hàng',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Thất bại',
          description: 'Thêm giỏ hàng thất bại',
        });
      });
    // .finally(() => setLoading(false));
  };
  // useEffectOnce(() => {
  //   fethMarket();
  // });
  useSWR(`marketplace/id`, fethMarket);

  const fetchDataComment = async () => {
    await instanceAxios
      .get(
        `comments/list?marketplace_id=${params.marketId
        }&skip=${0}&limit=${1000}`
      )
      .then((res) => {
        setCommentList(res.data.data.list_comment);
      })
      .catch((err) => {
        setCommentList([]);
        console.log(err);
      });
  };
  const fetchListGrowUp = async (productId: string) => {
    console.log('fetchListGrowUp');
    await instanceAxios
      .get(`product/${productId}/grow_up?skip=0&limit=100`)
      .then((res) => {
        console.log(res.data.data.list_grow_up);
        setDataGrowUp(res.data.data.list_grow_up);
      })
      .catch((err) => console.log('asdadasd'));
  };
  const fetchDataTransaction = async (
    transactionType: 'transaction_sf' | 'transaction_fm',
    producId: string
  ) => {
    await instanceAxios
      .get(`${transactionType}/${producId}/get`)
      .then((res) => {
        console.log('transaction', res.data.data);
        setDataListTransaction(res.data.data);
      })
      .catch((err) => {
        setDataListTransaction([]);
        console.log(err);
      });
  };
  useSWR(`comments/list?marketplace_id=${params.marketId}`, fetchDataComment);
  const listInformation = [
    {
      label: 'Tên sản phẩm',
      value: dataProduct.name,
    },
    {
      label: 'Giá đơn vị',
      value: dataProduct.price,
    },
    {
      label: 'Số lượng còn',
      value: dataProduct.quantity,
    },
    {
      label: 'Ngày đăng bán',
      value: moment(dataProduct.created_at).format('DD/MM/YYYY'),
    },
    {
      label: 'Loại sản phẩm',
      value: dataProduct.product_type,
    },
    {
      label: 'Trạng thái sản phẩm',
      value: dataProduct.product_status,
    },
    {
      label: 'Sở hửu bởi',
      value: dataProduct.user?.username,
    },
    {
      label: 'Email liên hệ',
      value: dataProduct.user?.email,
    },
  ];
  // setOwner();
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };

  const columns: ColumnsType<TransactionType> = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      width: 200,
      render: (value, record, index) => record.user?.username,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (value, record, index) => record.quantity,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value, record, index) => record.price,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (value, record, index) =>
        moment(record.created_at).format('DD/MM/YYYY'),
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'tx_hash',
      render: (value, record, index) =>(
        <a href={`https://goerli.arbiscan.io/tx/${record.tx_hash}`} target="_blank">
            <FontAwesomeIcon icon={faUpRightFromSquare} style={{color: "#000"}}/>
        </a>)
    },
    // {
    //   title: 'Status',
    //   render: (value, record, index) => moment(record.).format('DD/MM/YYYY'),
    // },
  ];

  const onUpload = (e: UploadChangeParam<UploadFile<any>>) => {
    console.log(e);
  };

  return (
    <div className="w-full m-auto pt-[100px] pb-[50px]">
      {loadingPage ? (
        <></>
      ) : (
        <>
          <div className="px-[50px]">
            <div className="relative flex justify-between gap-x-10">
              <div className="w-1/2">
                <Image
                  className="object-cover rounded-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
                  alt=""
                  width={'100%'}
                  preview={false}
                  height={450}
                  src={dataProduct.banner}
                />
              </div>
              <div className="w-1/2 top-4/12 rounded">
                <div className="w-full flex justify-between text-[30px] text-[#222222] font-semibold font-[Work Sans]">
                  <p>{dataProduct.name}</p>
                  <div className="text-[20px] mr-[20px] space-x-8">
                    <ShareAltOutlined />
                    <EllipsisOutlined />
                  </div>
                </div>
                <div className="flex w-full gap-x-2 tetx-[16px] text-[#7B7B7B] font-light">
                  Sản phẩm của
                  <Link
                    className="flex space-x-2 items-center"
                    href={`/user/${dataProduct.user?.id}`}
                  >
                    <p className="text-[#313064] font-bold">
                      {dataProduct.user?.username}
                    </p>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size={'1x'}
                      style={{ color: '#1677ff' }}
                    />
                  </Link>
                </div>
                <div className="text-[16px] leading-10 text-[#5f5e5e] text-justify">
                  {dataProduct.description ||
                    'Chủ sản phẩm vẫn chưa thêm mô tả gì?????'}
                </div>

                {/* <p className="text-[27px] text-[#2DB457] font-[Work Sans] font-[600]">
              $ {dataProduct.price?.toLocaleString()}
            </p> */}

                {/* <div className="flex gap-x-4 my-[20px]">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="w-fit items-center py-[10px] px-[20px] bg-lime-50 rounded border-[1px] border-[#1f5145]"
                    >
                      <EyeOutlined className="mr-[5px]" />
                      12313
                    </div>
                  ))}
                </div> */}
                <div className="select-none	rounded-xl w-full mt-[20px] border-[1px] border-gray-300">
                  <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
                    <FieldTimeOutlined className="text-[20px]" />
                    <p className="text-[16px] tracking-wider">
                      Ngày đăng bán:{' '}
                      {moment(dataMarket.created_at).format('LLL')}
                    </p>
                  </div>
                  <div className="p-[20px]">
                    <div>
                      <p>Giá sản phẩm</p>
                      <p className="text-[30px] tracking-widest	  font-[600]">
                        {`${dataProduct.price || 0} ${currency}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 py-[10px] font-medium text-gray-600">
                      <p>{`Sản phẩm hiện còn:`}</p>
                      <p className="font-bold  text-[20px]">
                        {dataProduct.quantity || 0}
                      </p>
                    </div>
                    <div className="flex items-center space-x-10">
                      <Space>
                        <MinusCircleOutlined
                          onClick={() =>
                            setBuyQuantity(
                              buyQuantity <= 0 ? 0 : buyQuantity - 1
                            )
                          }
                          className="text-[20px] text-blue-700"
                        />
                        {/* <MinusSquareOutlined  /> */}
                        <InputNumber
                          className="w-[150px]"
                          addonBefore={'Số lượng'}
                          defaultValue={dataProduct.quantity ? buyQuantity : 0}
                          value={dataProduct.quantity ? buyQuantity : 0}
                          onChange={(e) => setBuyQuantity(e || 0)}
                          // addonAfter={<div onClick={(e) => alert('OK')}>Max</div>}
                          min={0}
                          max={dataProduct.quantity}
                        />
                        <PlusCircleOutlined
                          onClick={() => {
                            if (dataProduct.quantity) {
                              setBuyQuantity(
                                dataProduct.quantity === buyQuantity
                                  ? dataProduct.quantity
                                  : buyQuantity + 1
                              );
                            } else {
                              notification.error({
                                message: 'Sản phẩm hiện không còn!!!',
                              });
                            }
                          }}
                          className="text-[20px] text-blue-700"
                        />
                      </Space>
                      <p>
                        Tổng phí là: {buyQuantity * (dataProduct.price || 0)}{' '}
                        {currency}
                      </p>
                    </div>
                    <div className="flex w-full items-center mt-[10px]">
                      <div className="w-2/3 text-[16px] flex items-center rounded-xl overflow-hidden space-x-[1px]">
                        <div
                          onClick={() => login(() => setShowModalPay(true))}
                          className="w-4/5 text-center bg-[#2081E1] py-[12px] text-md leading-md font-semibold text-white"
                        >
                          Mua ngay
                        </div>
                        <div
                          onClick={() =>
                            login(() => {
                              buyQuantity
                                ? fetchAddCartItem()
                                : notification.error({
                                  message: 'Vui lòng chọn số lượng',
                                });
                            })
                          }
                          className="w-1/5 text-center bg-[#2081E1] py-[12px]"
                        >
                          <FontAwesomeIcon
                            style={{ color: '#ffffff' }}
                            icon={faCartShopping}
                          />
                        </div>
                      </div>
                    </div>
                    <Modal
                      onCancel={() => setShowModalPay(false)}
                      open={showModalPay}
                      footer={[]}
                    >
                      <CheckoutForm
                        producId={dataProduct?.id || ''}
                        price={dataProduct.price || 0}
                        quantity={dataProduct.quantity || 0}
                        buyQuantity={buyQuantity}
                        onSuccess={() => {
                          setShowModalPay(false);
                          mutate(`marketplace/id`);
                        }} receiver={''} phone={''} address={''} />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>

            {/* <Segmented
              size={'large'}
              className={'mt-[50px]'}
              options={[
                { label: 'Thông tin chung', value: 'GENERAL' },
                { label: 'Nhà cung cấp', value: 'PROVIDER' },
              ]}
              onChange={(e) => setGeneralAndProvider(e as string)}
            /> */}
            {generalAndProvider === 'GENERAL' ? (
              <>
                <div className="w-full flex mt-[30px] gap-x-10 ">
                  {/* <div className="w-1/2 pt-[10px]"> */}
                  {/* <div className="w-full flex space-x-10"> */}
                  {/* Giới thiệu chủ sử hữu */}
                  {/* <div className=" w-1/2 rounded-xl overflow-hidden border-[1px] border-gray-300">
                        <div className="py-[15px] text-center font-bold border-b-[1px] border-gray-300 ">
                          Chủ sở hữu
                        </div>
                        <div className="p-[20px] flex flex-col space-y-10 items-center">
                          <Owner {...dataOwner} />
                        </div>
                      </div> */}
                  {/* Thông tin sản phẩm */}
                  {/* <div className="flex-col w-1/2 rounded-xl border-[1px] border-gray-300 overflow-auto">
                        <div className="py-[15px] text-center font-bold border-b-[1px] border-gray-300  ">
                          Thông tin sản phẩm
                        </div>
                        <div className="flex flex-col w-full px-[20px] py-[15px]">
                          {listInformation.map((item, index) => (
                            <div
                              key={index}
                              className="w-full flex justify-between items-center py-[5px]"
                            >
                              <p>{item.label}</p>
                              <Paragraph copyable>{item.value}</Paragraph>
                            </div>
                          ))}
                        </div>
                      </div> */}
                  {/* </div> */}
                  {/* </div> */}
                  <div className="w-1/2  rounded-xl overflow-hidden border-[1px] border-gray-300">
                    <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
                      <FieldTimeOutlined className="text-[20px]" />
                      <p className="text-[16px] font-semibold tracking-wider">
                        Thống kê hoạt động của sản phẩm vừa qua
                      </p>
                    </div>
                    <div className="relative pt-[20px] px-[50px]">
                      <Line
                        // className="mt-[100px]"
                        options={options}
                        data={dataChartProps}
                      />
                      <p className="absolute font-semibold -rotate-90 left-0 top-1/2 -translate-y-1/2">
                        Số lượng
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 border-[1px] rounded-xl border-gray-300">
                    <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
                      <FieldTimeOutlined className="text-[20px]" />
                      <p className="text-[16px] font-semibold tracking-wider">
                        Offers
                      </p>
                    </div>
                    <Row className="px-[10px] py-[15px] border-[1px] border-b-0">
                      <Col span={2}></Col>
                      <Col span={4}>
                        <p>Vai trò</p>
                      </Col>
                      <Col span={4}>
                        <p>Tên</p>
                      </Col>
                      <Col span={4}>
                        <p>Email</p>
                      </Col>
                      <Col span={4}>
                        <p>Mã giao dịch</p>
                      </Col>
                    </Row>
                    <ChainItem
                      role="Chủ sở hữu"
                      data={dataHistory as DetailHistoryType}
                    />
                    {/* before user */}
                    {dataHistory.product?.product_type === 'FARMER' && (
                      <ChainItem
                        role="Công ty hạt giống"
                        data={
                          (dataHistory.transactions_sf as DetailHistoryType) ||
                          {}
                        }
                      />
                    )}
                    {dataHistory.product?.product_type === 'DISTRIBUTER' && (
                      <>
                        <ChainItem
                          role="Công ty hạt giống"
                          data={
                            (dataHistory.transactions_fm as DetailHistoryType) ||
                            {}
                          }
                        />
                        <ChainItem
                          role="Farmer"
                          data={
                            (dataHistory.transactions_fm as DetailHistoryType) ||
                            {}
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full flex gap-x-10 mt-[50px]">
                  <div className="w-1/2 rounded-xl border-[1px] border-gray-300">
                    <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
                      <FieldTimeOutlined className="text-[20px]" />
                      <p className="text-[16px] font-semibold tracking-wider">
                        Bình luận
                      </p>
                    </div>
                    {/* <Segmented
                      size={'large'}
                      options={[
                        { label: 'Bình luận', value: 'COMMENT' },
                        { label: 'Lịch sử giao dịch', value: 'HISTORY' },
                      ]}
                      onChange={(e) => setChangePageRight(e as string)}
                    /> */}
                    <div className="w-full ">
                      {/* {changePageRight === 'COMMENT' && ( */}
                      <div className=" p-[20px] rounded-xl">
                        <div className="max-h-[300px]  overflow-auto">
                          {commentList.length ? (
                            commentList.map((item, index) => (
                              <CommentItem
                                isOwner={
                                  dataProduct.created_by === item.user_id
                                }
                                {...item}
                                key={index}
                              />
                            ))
                          ) : (
                            <Empty
                              image={Empty.PRESENTED_IMAGE_DEFAULT}
                              description={'Chưa có bình luận nào'}
                            />
                          )}
                        </div>
                        <CommentInput marketId={params.marketId} />
                      </div>
                      {/* )} */}
                      {/* {changePageRight === 'HISTORY' && ( */}
                      {/* )} */}
                    </div>
                  </div>
                  <div className="w-1/2 h-fit rounded-xl border-[1px] border-gray-300">
                    <div className="flex items-center space-x-4 border-b-[1px] p-[20px]">
                      <FieldTimeOutlined className="text-[20px]" />
                      <p className="text-[16px] font-semibold tracking-wider">
                        Lịch sử giao dịch
                      </p>
                    </div>
                    <div>
                      <Table
                        columns={columns}
                        dataSource={dataListTransaction}
                        pagination={false}
                        scroll={{ y: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {((dataMarket.order_type !== 'SEEDLING_COMPANY' &&
                  dataHistory.transactions_sf) ||
                  dataHistory.transactions_fm) && (
                    <ProductOrigin
                      originType={
                        dataMarket.order_type === 'SEEDLING_COMPANY'
                          ? 'seed'
                          : 'provider'
                      }
                      transactions={
                        dataHistory.transactions_sf || dataHistory.transactions_fm
                      }
                      {...dataHistory}
                    />
                  )}
              </>
            )}
            {dataMarket.order_type === 'FARMER' && (
              <div
                //  relative before:content-[''] before:left-[15px] before:absolute before:w-[1px] before:h-full before:bg-black
                className={`border-l-2 border-[#42bb67] block w-2/3 m-auto mt-[150px]`}
              >
                <div className="relative w-fit flex items-center p-[20px] border-[1px] border-[#42bb67] border-l-0">
                  <FontAwesomeIcon
                    icon={faArrowTrendUp}
                    size={'2xl'}
                    style={{ color: '#29c214' }}
                  />
                  <p className="pl-[20px]">Quá trình phát triển </p>
                </div>
                <div className="ml-[-111px] max-h-[700px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
                  {dataGrowUp.length ? (
                    dataGrowUp.map((item, index) => (
                      <GrowUpItem {...item} key={index} />
                    ))
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description={'Chưa có dữ liệu!!'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="max-h-[800px] text-white pt-[50px] ">
            <div className=" flex items-center  py-[30px] text-2xl mb-[50px] pl-[100px] bg-[#42bb67]">
              <p> Giới thiệu chi tiết về sản phẩm</p>
            </div>
            <div className="flex h-[600px] w-full snap-y bg-white rounded text-[#373737] px-[50px] gap-y-10 overflow-auto pt-[50px]">
              {dataProduct.detail_description?.length ? (
                <>
                  <div className="w-1/4 max-h-full overflow-y-auto flex flex-col gap-y-5 items-end px-[30px]">
                    {dataProduct.detail_description?.map((item, index) => (
                      <Image
                        key={index}
                        className={`border-2 rounded-full p-[3px] object-cover ${index === selectedDescription
                            ? 'border-green-500'
                            : 'border-gray-200'
                          }`}
                        onClick={() => setSelectedDescription(index)}
                        width={150}
                        height={150}
                        preview={false}
                        alt=""
                        src={item.image}
                      />
                    ))}
                  </div>
                  <div className="w-3/4 h-full">
                    <Description
                      showEdit={false}
                      {...dataProduct.detail_description[selectedDescription]}
                    />
                  </div>
                </>
              ) : (
                <Empty
                  className="m-auto"
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  description="Không có dữ liệu"
                />
              )}
              {/* {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 && 'flex-row-reverse'
              } items-center scroll-ml-6 justify-between rounded w-full pr-[50px]`}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimaryHover: '#2db457',
                      primaryColor: '#e62929',
                    },
                  },
                  token: {
                    colorBgContainer: '#7f84d4',
                  },
                }}
              >
                {dataProduct.created_by === currentUser.id && (
                  <Popconfirm
                    title={'Xác nhận xóa mô tả này'}
                    onConfirm={() => alert('OK')}
                  >
                    <DeleteTwoTone className="absolute top-1/2 right-0 text-2xl" />
                  </Popconfirm>
                )}
              </ConfigProvider>
              <div className="relative">
                <Image
                  className="object-cover w-1/2 "
                  width={550}
                  height={650}
                  style={{ borderRadius: '10px' }}
                  alt=""
                  src={staticVariables.qc1.src}
                />
                {dataProduct.created_by === currentUser.id && (
                  <Upload
                    showUploadList={false}
                    multiple={false}
                    onChange={onUpload}
                  >
                    <EditTwoTone className="absolute top-0 right-0 translate-x-full translate-y-[-100%] text-2xl" />
                  </Upload>
                )}
              </div>
              <div className="w-1/2 px-[50px]">
                <InputCustom
                  className="text-4xl mb-[20px]"
                  name={''}
                  initialValue={'Nay chị Sốt nên lên bài hơi trễMưa'}
                  APIurl={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  queryType={'user'}
                  input={{ maxLength: 30 }}
                />
                <TextAreaCustom
                  name={''}
                  showEdit={dataProduct.created_by === currentUser.id}
                  initialValue={`Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết
                  sớm nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có
                  2 tay + trời mưa to đường trơn mà nhà c cũng không gần KTX lắm
                  nên việc Sót đơn hoặc để các em chờ hơi lâu là một thiết sót
                  lớn với chịCác em bao dung sự bất tiện này nhé LÊN ĐƠN KÈM SỐ
                  PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào cũng có các
                  em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên cứ mạnh dạn
                  lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN
                  XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM
                  MẮM #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT
                  #15_20k -CÁ VIÊN CHIÊN MẮM #20k`}
                  APIurl={''}
                  queryType={'product'}
                  input={{ maxLength: 1000 }}
                />
              </div>
            </div>
          ))} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
