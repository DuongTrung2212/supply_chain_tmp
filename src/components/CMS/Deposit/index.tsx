import {
  faEnvelope,
  faMap,
  faPhone,
  faRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import React from 'react';

export default function Deposit() {
  return (
    <div className="w-full">
      <p className="text-[25px] text-center font-bold">Nạp tiền bằng VNpay</p>
      <div className="w-full text-[16px] mt-[30px] flex items-center justify-center gap-x-10">
        <div className="w-1/4 p-[30px] flex flex-col">
          <p className="font-semibold text-[20px]">Hệ thống</p>
          <p>Bước 1: Chọn số tiền</p>
          <p>Bước 1: Chọn ngân hàng thụ hưởng</p>
          <p>Bước 1: Thực hiện hoàn tất nạp tiền</p>
        </div>
        <FontAwesomeIcon
          size={'5x'}
          icon={faRightLong}
          style={{ color: '#5b94f0' }}
        />
        <div className="w-1/4 p-[30px] flex flex-col">
          <p className="font-semibold text-[20px]">Hệ thống VNpay</p>
          <p>Bước 1: Nhập số thẻ, họ tên chủ thẻ, ngày hết hạn thẻ</p>
          <p>Bước 2: Nhập mã OTP ở điện thoại</p>
          <p>Bước 3: Hoàn tất nạp tiền</p>
        </div>
      </div>
      <div className="w-2/3  m-auto">
        <div className="w-full p-[20px] border-[1px] rounded-xl bg-[#f9f9f9]">
          <div className="w-full flex">
            <div className="w-2/3">
              <p className="text-[20px] font-bold py-[20px]">
                Vui lòng chọn số tiền
              </p>
              <div className="w-full flex flex-wrap gap-5">
                <p className="w-2/5 bg-white p-[10px] shadow-lg text-center font-bold rounded-xl">
                  100.000 đ
                </p>
                <p className="w-2/5 bg-white p-[10px] shadow-lg text-center font-bold rounded-xl">
                  100.000 đ
                </p>
                <p className="w-2/5 bg-white p-[10px] shadow-lg text-center font-bold rounded-xl">
                  100.000 đ
                </p>
                <p className="w-2/5 bg-white p-[10px] shadow-lg text-center font-bold rounded-xl">
                  100.000 đ
                </p>
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-[20px] font-bold py-[20px]">Nhập số khác</p>
              <input
                placeholder="Vui lòng nhập số tiền..."
                className="p-[10px] px-[20px] shadow-lg rounded-xl"
              />
            </div>
          </div>
          <div className="w-full flex flex-col mt-[30px] space-y-5">
            <div className="w-full">
              <p className="text-[20px] font-bold py-[10px]">
                Vui lòng chọn số tiền
              </p>
              <div className="w-full bg-white p-[10px] px-[30px] shadow-lg rounded-xl flex flex-col">
                <div className="flex font-normal space-x-2">
                  <p>Ngân hàng thụ hưởng</p>
                  <p className="text-red-800">*</p>
                </div>
                <p className=" font-bold">MB - Ngân hàng TMCP Quân đội</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[20px] font-bold py-[10px]">
                Vui lòng chọn ngôn ngữ
              </p>
              <div className="w-full bg-white p-[10px] px-[30px] shadow-lg rounded-xl flex flex-col">
                <div className="flex font-normal space-x-2">
                  <p>Ngôn ngữ</p>
                  <p className="text-red-800">*</p>
                </div>
                <p className=" font-bold">Việt Nam</p>
              </div>
            </div>
          </div>
        </div>
        <p className="w-fit rounded-lg font-semibold text-white p-[10px] float-right my-[20px]  bg-[#337aee]">
          Hoàn tất nạp tiền
        </p>
      </div>
      <div className="mt-[100px]">
        <p className="text-[25px] font-bold py-[10px]">Liên hệ</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faPhone} />
            <p>0123123213</p>
          </div>
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>datbe@gmail.com</p>
          </div>
          <div className="flex items-center space-x-5">
            <FontAwesomeIcon icon={faMap} />
            <p>
              258 Lé Thanh Nghi. Phuong Hoa Cudng, Quan Håi Chåu, Thånh phö Då
              Nång
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
