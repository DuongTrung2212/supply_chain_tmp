'use client';
import instanceAxios from '@/api/instanceAxios';
import RoleSelect from '@/components/Header/Register/RoleSelect';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import {
  Button,
  ConfigProvider,
  Image,
  Radio,
  Space,
  Typography,
  notification,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import Questions from './components/Questions';
import RadioCustom from './components/RadioCustom';

export default function RegisterRulePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [rule, setRule] = useState('');
  const [gender, setGender] = useState('');
  const [yearOld, setYearOld] = useState('');
  const [education, setEducation] = useState('');
  const [device, setDevice] = useState('');
  const [numericKeypad, setNumericKeypad] = useState('');
  const [experience, setExperience] = useState('');
  const [digitsExperience, setDigitsExperience] = useState('');
  const [aphabetExperience, setAphabetExperience] = useState('');
  const [japaneseAbility, setJapaneseAbility] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { mutate } = useSWRConfig();
  const currentUser = useAppSelector((state) => state.user.user);
  const onFinishSelectRule = (e: string) => {
    console.log(e);
    setRule(e);
  };
  const handlePrev = () => {
    if (currentTab == 0) {
      return;
    } else {
      setCurrentTab(currentTab - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (currentTab >= listTab.length - 1) {
      await fetchChangeRule();
    } else {
      setCurrentTab(currentTab + 1);
    }
    setLoading(false);
  };
  const listTab = [
    // Get start
    <div key={0}>
      <div>
        <p className="text-lg font-medium">Chào mừng bạn tham gia OPENCROWD</p>
        <p className="pt-[12px] pb-[20px] text-[14px]">
          Hãy bắt đầu thiết lập tài khoản của bạn!
        </p>
        <Button onClick={handleSubmit}>Get go</Button>
      </div>
    </div>,
    // Select Roles
    <div key={1}>
      <RoleSelect onFinishSelectRule={onFinishSelectRule} />
      <Button className="w-fit block m-auto mt-[100px]" onClick={handleSubmit}>
        Next
      </Button>
    </div>,
    // Question1
    <div key={2}>
      <p className="text-2xl py-2 font-medium">Hi {currentUser.full_name}</p>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={gender}
          onChange={(e) => setGender(e)}
          title="Giới tính của bạn là gì?"
          itemList={[
            { label: 'Nam', value: 'Nam' },
            { label: 'Nữ', value: 'Nữ' },
          ]}
        />
        <RadioCustom
          defaulValue={yearOld}
          onChange={(e) => setYearOld(e)}
          title="Xin vui lòng cho biết, Anh/Chị nằm trong độ tuổi nào? "
          itemList={[
            { label: 'Từ 18-25 tuổi', value: 'Từ 18-25 tuổi' },
            { label: 'Từ 26-35 tuổi', value: 'Từ 26-35 tuổi' },
            { label: 'Từ 36-45 tuổi', value: 'Từ 36-45 tuổi' },
            { label: 'Trên 45 tuổi', value: 'Trên 45 tuổi' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!yearOld || !!!gender} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 2
    <div key={3}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={education}
          onChange={(e) => setEducation(e)}
          title="Xin vui lòng cho biết, trình độ học vấn hiện tại của Anh/Chị"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Trung cấp', value: 'Trung cấp' },
            { label: 'Cao đẳng', value: 'Cao đẳng' },
            { label: 'Đại học', value: 'Đại học' },
            { label: 'Sau đại học', value: 'Sau đại học' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!education} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 3
    <div key={4}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={device}
          onChange={(e) => setDevice(e)}
          title="Anh/chị sử dụng loại máy tính gì để thực hiện công việc?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Máy bàn ( PC)', value: 'Máy bàn ( PC)' },
            { label: 'Laptop', value: 'Laptop' },
          ]}
        />
        <RadioCustom
          defaulValue={numericKeypad}
          onChange={(e) => setNumericKeypad(e)}
          title="Anh/chị đã thuộc phím trên bàn phím số không?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có thuộc phím trên bàn phím số' },
            { label: 'Không', value: 'Không thuộc phím trên bàn phím số' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!device || !!!numericKeypad} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>,
    // Question 4
    <div key={5}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={digitsExperience}
          onChange={(e) => setDigitsExperience(e)}
          title="Anh/chị có kinh nghiệm nhập chữ số viết tay không?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có kinh nghiệm nhập chữ số viết tay' },
            { label: 'Không', value: 'Không kinh nghiệm nhập chữ số viết tay' },
          ]}
        />
        <RadioCustom
          defaulValue={aphabetExperience}
          onChange={(e) => setAphabetExperience(e)}
          title="Anh/chị có kinh nghiệm nhập chữ Aphabet viết tay không ?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có kinh nghiệm nhập chữ Aphabet viết tay' },
            {
              label: 'Không',
              value: 'Không kinh nghiệm nhập chữ Aphabet viết tay',
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button
          disabled={!!!aphabetExperience || !!!digitsExperience}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>,
    // Question 5
    <div key={5}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={japaneseAbility}
          onChange={(e) => setJapaneseAbility(e)}
          title="Anh/chị có năng lực tiếng Nhật không ?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có năng lực tiếng Nhật' },
            {
              label: 'Không',
              value: 'Không năng lực tiếng Nhật',
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!japaneseAbility} onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </div>
    </div>,
    // <RoleSelect onFinishSelectRule={onFinishSelectRule} key={0} />,
    // <Questions key={1} />,
  ];
  const fetchChangeRule = async () => {
    console.log(rule);
    await instanceAxios
      .put(`user/surveys`, {
        survey_data: {
          user_role: rule,
          gender,
          yearOld,
          education,
          device,
          numericKeypad,
          digitsExperience,
          aphabetExperience,
          japaneseAbility,
        },
      })
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: (
            <p>
              Đã yêu cầu xác thực tài khoản!!! <br />
              Vui lòng chờ 1 khoảng thời gian để hệ thống xác thực!!!
            </p>
          ),
        });
        route.replace('/home');
        // mutate(mutateAPI);
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: 'Yêu cầu xác thựcthật bại',
        });
      });
  };
  return (
    <div className="flex min-h-[750px]">
      <div className="w-1/2 pt-[100px] flex flex-col items-center min-h-[750px]">
        <Image
          width={'50%'}
          // height={'70%'}
          preview={false}
          className="object-cover m-auto"
          alt=""
          src={staticVariables.register_rule.src}
        />
        <p className="flex items-center gap-1 text-txt-secondary font-bold text-[32px] leading-[44px] mt-[13px] relative text-center ">
          Wellcome
        </p>
        <p className="font-normal text-[18px] leading-7 mt-3">
          We provide data on extended sourcing methods in the community..
        </p>
      </div>
      <div className="w-1/2 h-full min-h-[750px] px-[100px] py-[150px] bg-[#f9f9f9]">
        {listTab[currentTab]}
      </div>
      {/* <div className="flex h-full w-full">{listTab[currentTab]}</div>
      <div className="flex items-center gap-x-10 mt-10">
        <Button
          loading={loading}
          disabled={currentTab <= listTab.length - 1}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-1/3 backdrop-blur-sm"
          onClick={handlePrev}
        >
          Quay lại
        </Button>
        <Button
          loading={loading}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-2/3 backdrop-blur-sm"
          onClick={handleSubmit}
        >
          Tiếp theo
        </Button>
      </div> */}
    </div>
  );
}
