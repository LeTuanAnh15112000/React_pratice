function Home() {
  return (
    <div className="container mt-5">
      <h2>Chào mừng bạn đến vên trang của chúng tôi</h2>
      <div className="p_contain">
        <span>Yêu cầu:</span>
        <p>
          Sử dụng API từ trang web <a href="https://reqres.in">https://reqres.in</a> để tạo trang website
          <br />
          Sử dụng thư viện Reactjs để tạo 1 màn hình website cơ bản bao gồm các chức năng:
        </p>
        <ul>
          <li>1.Đăng nhập</li>
          <li>2.Thêm User</li>
          <li>3.Sửa User</li>
          <li>4.Xóa User</li>
          <li>5.Hiển thị tất cả User</li>
          <li>6.Tìm kiếm User theo Email</li>
          <li>7.Sắp xếp theo id và FirstName</li>
          <li>8.Import User từ file .csv</li>
          <li>9.Export User từ file .csv</li>
        </ul>
        <p>
          Tự do tùy chỉnh html, css để có một website nhẹ nhàng, khoa học và đẹp đẽ
          <br />
          Commit và đẩy sourcse code lên github public
          <br />
          Triển khai website lên Heroku để demo
        </p>
      </div>
    </div>
  );
}

export default Home;
