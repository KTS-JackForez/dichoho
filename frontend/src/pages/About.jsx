import React from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
import banner from "../assets/imgs/bn.png";
const About = () => {
  return (
    <div className="bg-gray-100">
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-lg bg-white mx-auto px-5 py-7 text-justify">
        <img
          src={banner}
          alt=""
          className="mx-auto h-full w-full object-cover"
        />
        <p className="indent-8 mt-3">
          Dichoho.top là một giải pháp của Sàn thương mại điện tử{" "}
          <a href="https://sale168.vn" className="italic underline">
            sale168.vn
          </a>{" "}
          chuyên về cung cấp nông sản sạch và các sản phẩm OCOP của thành phố
          Hải Phòng. Chúng tôi đặt mục tiêu quảng bá và thúc đẩy nông sản tại
          địa phương, đồng thời nâng cao nhận thức về nông sản sạch và bền vững
          trong cộng đồng.
        </p>
        <p>
          Sứ mệnh của chúng tôi là quảng bá, giới thiệu và phát triển các sản
          phẩm nông sản tại Hải Phòng. Chúng tôi đặc biệt quan tâm đến nông sản
          sạch, an toàn và bền vững, đồng thời cũng tạo điều kiện cho các sản
          phẩm OCOP của địa phương có cơ hội tiếp cận thị trường rộng lớn hơn.
        </p>
        <p>
          Một trong những chức năng chính của chuyên trang là dịch vụ "Đi chợ
          hộ", nơi chúng tôi cung cấp các sản phẩm nông sản và giao hàng đến tận
          nơi, đúng giờ và với mức phí tối ưu. Điều này đáp ứng tiêu chí và yêu
          cầu của người tiêu dùng, đảm bảo rằng sản phẩm được cung cấp là "Tiện
          - Tươi - Sạch - Rẻ". Đi chợ hộ là một dịch vụ cần thiết và hữu ích cho
          những người bận rộn và muốn tiết kiệm thời gian mua sắm.
        </p>
        <p>
          Mục tiêu của chuyên trang Dichoho.top là trở thành một tấm “bản đồ số”
          giới thiệu và cung cấp nông sản an toàn và sản phẩm OCOP của Hải Phòng
          cho mọi người. Ngoài ra chúng tôi tin rằng việc quảng bá nông sản sạch
          và OCOP sẽ mở ra các hình thức du lịch sinh thái kết hợp với trải
          nghiệm nông nghiệp thú vị và hiệu quả trên địa bàn thành phố Hải
          Phòng.
        </p>
        <p>
          Với sứ mệnh và mục tiêu của mình, Dichoho.top cam kết cung cấp cho
          khách hàng những sản phẩm nông sản chất lượng và chính sách dịch vụ
          tốt nhất. Chúng tôi luôn nỗ lực để đáp ứng nhu cầu mua sắm và tạo niềm
          tin cho khách hàng với sự chất lượng, tin cậy và sự hài lòng tối đa.
        </p>
        <p>
          Chúng tôi cam kết tạo điều kiện thuận lợi cho các nhà sản xuất, các
          chủ thể, HTX và doanh nghiệp nhỏ để tiếp cận thị trường trực tuyến và
          quảng bá sản phẩm của mình trên chuyên trang dichoho.top.
        </p>
        <p>
          Chúng tôi tin rằng sự hợp tác và phát triển bền vững với các đối tác,
          khách hàng và cộng đồng là chìa khóa để thành công. Chúng tôi luôn
          lắng nghe ý kiến đóng góp của khách hàng và sẵn lòng cải tiến để mang
          đến trải nghiệm mua sắm tốt nhất cho mọi người.
        </p>
        <p>
          Hãy tham gia và đồng hành cùng{" "}
          <a href="https://sale168.vn" className="italic underline">
            sale168.vn
          </a>{" "}
          ngay hôm nay để khám phá thế giới nông sản sạch và sản phẩm OCOP độc
          đáo của chúng tôi.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
