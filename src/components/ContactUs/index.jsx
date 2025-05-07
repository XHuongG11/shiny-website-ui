import styles from "./styles.module.css";
import { useState, useEffect } from "react";

function ContactUs() {
  const teamInfo = [
    {
      name: 'Lê Công Hùng',
      role: 'UI/UX Designer',
      image: '/img/avata/avataHung.png'
    },
    {
      name: 'Trần Nhật Minh',
      role: 'Frontend Developer',
      image: '/img/avata/avataMinh.png'
    },
    {
      name: 'Nguyễn Lê Mỹ Hoàng',
      role: 'Frontend Developer',
      image: '/img/avata/avataHoang.png'
    },
    {
      name: 'Cao Thị Xuân Hương',
      role: 'Backend Developer',
      image: '/img/avata/avataHuong.png'
    },
    {
      name: 'Vũ Năng Đăng Khoa',
      role: 'Project Management',
      image: '/img/avata/avataKhoa.png'
    },
    {
      name: 'Võ Thị Kim Anh',
      role: 'Content & Marketing',
      image: '/img/avata/avataAnh.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const membersPerPage = 3;
  const totalPages = Math.ceil(teamInfo.length / membersPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 3000); // tự chuyển mỗi 3 giây

    return () => clearInterval(interval); // dọn dẹp khi component unmount
  }, [totalPages]);

  const getSlideStyle = () => ({
    transform: `translateX(-${currentIndex * 100}%)`,
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    width: "100%"
  });

  return (
    <div className={styles.contactUsContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <img src="/img/giftImg/gift.png" alt="Contact Us" className={styles.contactHeader} />
        <div className={styles.overlayText}>
          <h1>Chào mừng đến với chúng tôi</h1>
          <p>"Trang sức không chỉ là vật phẩm – đó là phong cách, là câu chuyện bạn kể với thế giới."</p>
        </div>
      </header>

      {/* Team Section */}
      <section className={styles.team}>
        <h2>Đội ngũ phát triển</h2>
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={handlePrev} aria-label="Previous slide">
            ❮
          </button>
          <div className={styles.carouselWrapper}>
            <div className={styles.teamMembers} style={getSlideStyle()}>
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div className={styles.slide} key={pageIndex}>
                  {teamInfo
                    .slice(pageIndex * membersPerPage, (pageIndex + 1) * membersPerPage)
                    .map((person, index) => (
                      <div className={styles.member} key={index}>
                        <img src={person.image} alt={person.name} className={styles.memberImage} />
                        <p className={styles.memberName}>{person.name}</p>
                        <p className={styles.memberRole}>{person.role}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <button className={styles.navButton} onClick={handleNext} aria-label="Next slide">
            ❯
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <section className={styles.footerInfo}>
        <h5 className={styles.detailEnd}>Để biết thêm chi tiết về sản phẩm và dịch vụ của chúng tôi, vui lòng liên hệ ngay!</h5>
      </section>
    </div>
  );
}

export default ContactUs;