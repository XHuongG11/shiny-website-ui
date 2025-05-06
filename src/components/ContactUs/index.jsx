import { useState, useEffect } from "react";
import styles from "./styles.module.css";

function ContactUs() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Dữ liệu cho các thành viên trong đội ngũ
  const teamInfo = [
    {
      name: 'Lê Công Hùng',
      dob: '10/10/2004',
      hometown: 'Hà Tĩnh',
      role: 'UI/UX Designer',
      description: 'Tôi yêu thích thiết kế giao diện hiện đại và dễ sử dụng.',
      image: '/img/avata/avataHung.png'
    },
    {
      name: 'Trần Nhật Minh',
      dob: '26/11/2004',
      hometown: 'Quảng Bình',
      role: 'Frontend Developer',
      description: 'Luôn tìm kiếm sự hài hòa giữa thẩm mỹ và trải nghiệm.',
      image: '/img/avata/avataMinh.png'
    },
    {
      name: 'Nguyễn Lê Mỹ Hoàng',
      dob: '15/03/1998',
      hometown: 'Tây Ninh',
      role: 'Frontend Developer',
      description: 'Đam mê hiệu suất hệ thống và dữ liệu sạch.',
      image: '/img/avata/avataHoang.png'
    },
    {
      name: 'Cao Thị Xuân Hương',
      dob: '20/04/2004',
      hometown: 'Quảng Ngãi',
      role: 'Backend Developer',
      description: 'Cẩn thận và tận tâm trong từng chi tiết.',
      image: '/img/avata/avataHuong.png'
    },
    {
      name: 'Vũ Nguyên Đăng Khoa',
      dob: '05/05/2005',
      hometown: 'Hải Phòng',
      role: 'Project Management',
      description: 'Quản lý tiến độ và đảm bảo chất lượng dự án.',
      image: '/img/avata/avataKhoa.png'
    },
    {
      name: 'Võ Thị Kim Anh',
      dob: '09/09/2004',
      hometown: 'TP.Hồ Chí Minh',
      role: 'Content & Marketing',
      description: 'Truyền tải giá trị sản phẩm qua từng câu chữ.',
      image: '/img/avata/avataAnh.png'
    }
  ];

  // Nếu chưa chọn thành viên nào, mặc định sẽ hiển thị thành viên đầu tiên
  useEffect(() => {
    setSelectedMember(teamInfo[0]);
  }, []);

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
        <div className={styles.teamMembers}>
          {teamInfo.map((person, index) => (
            <div
              className={`${styles.member} ${selectedMember === person ? styles.selected : ''}`}
              key={index}
              onClick={() => setSelectedMember(person)}
            >
              <img src={person.image} alt={person.name} className={styles.memberImage} />
              <div className={styles.memberInfo}>
                <div className={styles.line}>
                  <p className={styles.title}>Tên:</p>
                  <p className={styles.content}>{person.name}</p> 
                </div>
                <div className={styles.line}>
                  <p className={styles.title}>Vai trò:</p>
                  <p className={styles.content}>{person.role}</p> 
                </div>
                <div className={styles.line}>
                  <p className={styles.title}>Ngày sinh:</p>
                  <p className={styles.content}>{person.dob}</p> 
                </div>
                <div className={styles.line}>
                  <p className={styles.title}>Quê quán:</p>
                  <p className={styles.content}>{person.hometown}</p> 
                </div>
                <div className={styles.line}>
                  <p className={styles.title}>Giới thiệu:</p>
                  <p className={styles.content}>{person.description}</p> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <section className={styles.footerInfo}>
        <p>Để biết thêm chi tiết về sản phẩm và dịch vụ của chúng tôi, vui lòng liên hệ ngay!</p>
      </section>
    </div>
  );
}

export default ContactUs;
