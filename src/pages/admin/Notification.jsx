import React from 'react'
import "../../assets/css/pages/notification.css";
export default function Notification() {
  return (
      <div className="col-md-9 content">
      <div className="container py-4">
  <div className="card card-table">
    <div className="card-body">
      <h4 className="card-title mb-4">Danh sách câu hỏi</h4>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tiêu đề câu hỏi</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col" className="text-end">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Làm thế nào để học React hiệu quả?</td>
              <td>20/05/2025</td>
              <td className="text-end">
                <button className="btn btn-sm btn-view me-2">
                  Xem chi tiết
                </button>
                <button className="btn btn-sm btn-delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sự khác biệt giữa useState và useEffect?</td>
              <td>19/05/2025</td>
              <td className="text-end">
                <button className="btn btn-sm btn-view me-2">
                  Xem chi tiết
                </button>
                <button className="btn btn-sm btn-delete">Xóa</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>REST API là gì?</td>
              <td>18/05/2025</td>
              <td className="text-end">
                <button className="btn btn-sm btn-view me-2">
                  Xem chi tiết
                </button>
                <button className="btn btn-sm btn-delete">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link" href="#">
              «
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              »
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

    </div>
  )
}
