import { Hrz, Imagez } from '@components/core';
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-80 bg-cover bg-center" style={{ backgroundImage: 'url(/images/about.png)' }}></div>
      <div className="container px-16">
        <div className="bg-white p-8 shadow-lg -mt-16 z-10">
          <div className="flex flex-col">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Chào mừng đến với công ty của chúng tôi</h1>
              <p className="text-lg">Chúng tôi cam kết mang đến những dịch vụ tốt nhất.</p>
            </div>
            <h2 className="mt-8 uppercase mb-2 font-bold text-xl">Decor Star</h2>
            <div className="card flex flex-wrap p-8">
              <div className="w-full lg:w-6/12">
                <p>
                  Chào mừng đến với Decor Star, nơi mang đến cho bạn không gian ánh sáng cá nhân hóa và đầy sáng tạo cho căn phòng của bạn.
                  Chúng tôi ra đời với sứ mệnh đem đến một địa chỉ đáng tin cậy dành cho những người yêu thích sự độc đáo, sáng tạo và tự
                  mình làm ra, với một bộ sưu tập đa dạng các sản phẩm đèn ngủ và tranh DIY.
                </p>
                <br />
                <br />
                <p>
                  Tại Decor Star, chúng tôi tin rằng mỗi căn phòng là một bức tranh tường sống động, và ánh sáng là điểm nhấn hoàn hảo để
                  làm nổi bật cá tính và phong cách cá nhân của bạn. Với một loạt các bộ sưu tập đèn ngủ và tranh DIY, chúng tôi mang đến
                  cho bạn không gian để tự do sáng tạo và biến giấc mơ của bạn thành hiện thực.
                </p>
                <br />
                <br />
                <p>
                  Không chỉ là sản phẩm, mỗi mẫu DIY của chúng tôi còn là một trải nghiệm sáng tạo. Tự tay lắp ráp từ các bộ phận, bạn sẽ
                  cảm nhận được sự hài lòng và niềm tự hào khi sản phẩm của bạn hoàn thiện và tỏa sáng trong không gian riêng của bạn.
                </p>
                <br />
                <br />
                <p>
                  Hãy tham gia vào cuộc hành trình sáng tạo cùng Decor Star, nơi bạn sẽ khám phá ra rằng không gian sống của bạn có thể được
                  biến thành một tác phẩm nghệ thuật độc đáo và đầy ấn tượng. Hãy để ánh sáng của chúng tôi chiếu sáng con đường sáng tạo
                  của bạn!
                </p>
              </div>
              <div className="w-full block lg:hidden my-8">
                <Hrz />
              </div>
              <div className="w-full lg:w-6/12">
                <div className="flex flex-col px-16 items-center justify-center gap-8">
                  <Imagez src="/images/about1.png" className="w-full h-full rounded-xl" />
                  <Imagez src="/images/about2.jpg" className="w-full h-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
