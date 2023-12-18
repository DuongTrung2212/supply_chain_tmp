'use client';
import HomeDescription from '@/components/Contents/Main/HomeDescription';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { increment } from '@/reducers/counterSlice';
import staticVariables from '@/static';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Image, Skeleton } from 'antd';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
// const Header = dynamic(() => import('@/components/Header'), {
//   loading: () => <Skeleton.Avatar />,
// });
// const Footer = dynamic(() => import('@/components/Footer'));
export default function Index() {
  const introductList = [
    {
      icon: '',
      label: 'Minh bạch và Theo dõi',
      description:
        'Chuỗi cung ứng giúp tăng cường sự minh bạch trong quá trình sản xuất và phân phối. Các bên liên quan có thể theo dõi nguồn gốc và di chuyển của sản phẩm từ nguồn cung cấp đến tay người tiêu dùng cuối cùng.',
    },
    {
      icon: '',
      label: 'Quản lý Rủi ro và Đáp ứng nhanh chóng',
      description:
        'Với thông tin minh bạch về chuỗi cung ứng, tổ chức có khả năng đánh giá và quản lý rủi ro hiệu quả hơn. Điều này giúp họ đưa ra các biện pháp đáp ứng nhanh chóng khi xảy ra sự cố, giảm thiểu ảnh hưởng tiêu cực.',
    },
    {
      icon: '',
      label: 'Tăng Cường Hiệu Quả Năng Suất',
      description:
        'Chuỗi cung ứng thông minh giúp tối ưu hóa quy trình sản xuất và phân phối, từ đó tăng cường hiệu quả năng suất và giảm thiểu lãng phí.',
    },
    {
      icon: '',
      label: 'Bảo vệ Quyền Lợi của Người Tiêu Dùng',
      description:
        'Sự minh bạch trong chuỗi cung ứng cung cấp thông tin rõ ràng cho người tiêu dùng về nguồn gốc, chất lượng và quá trình sản xuất của sản phẩm. Điều này tăng cường quyền lợi và sự tin tưởng của họ',
    },
    {
      icon: '',
      label: 'Tiết Kiệm Tài Nguyên và Bảo vệ Môi Trường',
      description:
        'Bằng cách theo dõi quá trình sản xuất và vận chuyển, chuỗi cung ứng có thể giúp tối ưu hóa sử dụng tài nguyên và giảm thiểu tác động tiêu cực đối với môi trường, hướng tới sự phát triển bền vững.',
    },
  ];
  const roleList = [
    {
      image: staticVariables.seedlingBg.src,
      role: 'Công ty hạt giống',
      decription: (
        <p>
          Nghiên Cứu và Phát Triển Hạt giống: Công ty hạt giống đảm nhận vai trò
          quan trọng trong việc nghiên cứu và phát triển các loại hạt giống chất
          lượng cao và có khả năng chịu sâu bệnh. <br />
          Cung Cấp Hạt giống Chất Lượng: Cung cấp hạt giống chất lượng giúp nông
          dân có nguồn giống đảm bảo năng suất và chất lượng. <br />
          Hỗ Trợ Kỹ Thuật: Cung cấp hỗ trợ kỹ thuật và giáo dục cho nông dân về
          cách sử dụng hạt giống một cách hiệu quả.
        </p>
      ),
    },
    {
      image: staticVariables.farmerBg.src,
      role: 'Nông dân',
      decription: (
        <>
          <p>
            Sản Xuất Nguyên Liệu: Nông dân là nguồn cung cấp chính cho nguyên
            liệu nông sản, bao gồm cây trồng, động vật, và các sản phẩm nông sản
            khác.
            <br />
            Bảo Dưỡng Đất Đai: Nông dân thực hiện các phương pháp canh tác để
            bảo vệ và nâng cao chất lượng của đất đai, đồng thời giữ cho môi
            trường nông nghiệp bền vững.
            <br />
            Minh Bạch Trong Sản Xuất: Việc minh bạch về cách sản phẩm được sản
            xuất là quan trọng để tạo niềm tin từ phía người tiêu dùng.
          </p>
        </>
      ),
    },
    {
      image: staticVariables.factoryBg.src,
      role: 'Nhà máy chế biến',
      decription: (
        <p>
          Chế Biến và Bảo Quản: Nhà máy chế biến đảm nhận trách nhiệm chế biến
          và bảo quản các sản phẩm nông sản để giữ cho chúng tươi ngon và an
          toàn. <br />
          Tạo Thêm Giá Trị: Bằng cách chế biến nông sản thành sản phẩm có giá
          trị cao, nhà máy chế biến giúp tăng giá trị gia tăng cho nguyên liệu
          đầu vào từ nông dân. <br />
          Xuất Khẩu và Phân Phối: Nếu có thể, nhà máy chế biến có vai trò xuất
          khẩu và phân phối sản phẩm đến các thị trường tiêu thụ.
        </p>
      ),
    },
  ];
  return (
    <>
      <Header />
      <div className={`mainpage text-white pt-[100px]`}>
        <div
          className={`w-[600px] text-[70px] py-[10px] ml-[70px] font-black	text-2xl]`}
        >
          Hệ thống chuỗi cung ứng sầu riêng
        </div>
        <div
          data-aos="fade-up"
          className={`w-full flex text-lg mt-[200px] pr-[100px] justify-end`}
        >
          {/* shadow-[0px_4px_50px_30px_#00000089] px-[30px] py-[20px] backdrop-blur-xl bg-[#00000089] rounded` */}
          <p data-aos="fade-up" className={`w-[500px]`}>
            DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của
            sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản
            phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này
            giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất
            đến người tiêu dùng cuối cùng
          </p>
        </div>
        <div className="bg-[#000000E2] pt-[300px] mt-[300px] ">
          <p
            data-aos="fade-up"
            className="m-auto text-center text-[35px] font-extrabold	"
          >
            Giới thiệu về DatBe
            <br /> Vai trò của chuỗi cung ứng
          </p>
          <div
            data-aos="fade-up"
            className={`w-full mt-[200px] relative justify-around flex before:content-[''] before:absolute before:block before:top-1/2 before:w-full before:h-[1px] before:bg-white`}
          >
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Minh bạch
            </div>
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Uy tín
            </div>
            <div
              className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
            >
              Minh bạch
            </div>
          </div>
          <div className="flex items-center px-[50px] justify-center flex-wrap gap-x-10">
            {introductList.map((item, index) => (
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                key={index}
                className="w-[400px] flex flex-col items-center text-center"
              >
                <Avatar
                  shape={'square'}
                  size={200}
                  icon={
                    <FontAwesomeIcon
                      icon={faCubes}
                      style={{ color: '#2d5ba9' }}
                    />
                  }
                />
                <strong className="text-[24px]">{item.label}</strong>
                <p className="w-full text-[16px] text-[#6c737d]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-y-[100px] text-black mt-[100px] py-[50px] rounded-sm bg-[#F5F5F5ED]">
            <p className="text-[40px] text-center font-black">
              Các tác nhân trong hệ thống
            </p>
            {roleList.map((item, index) => (
              <HomeDescription
                key={index}
                alignRight={index % 2 == 0}
                image={item.image}
                label={item.role}
                description={item.decription}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
