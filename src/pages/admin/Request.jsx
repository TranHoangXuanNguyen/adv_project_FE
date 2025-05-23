import { useState, useEffect } from "react";
import "../../assets/css/pages/request.css";
import axios from 'axios';
export default function Request() {
  const[request,setRequest]=useState([]);
  
  useEffect(()=>{
    const fetchRequest=async()=>{
    try{
      const res=await axios.get('http://localhost:8000/api/requesthelp');
        console.log("API response:", res.data);
      setRequest(res.data);
    }
    catch(error){
      console.error('Not found ',error);
    }
  };
  fetchRequest();
},[]);

  return (
      <div className="col-md-9 content">
      <div className="container py-4">
  <div className="card card-table">
    <div className="card-body bigbox">
      <h4 className="card-title mb-4 main-title">List of questions</h4>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Content </th>
              <th scope="col">Date of time</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
              {request.map((item,index)=>(
               <tr key={index}>
                <td className="fullname">{ item.sender_id}</td>
                <td className="content">{item.content}</td>
                <td className="datetime"> {item.created_at} 
                  </td>
              <td className="text-end">
                <button className="btn btn-sm btn-delete">Xóa</button>
              </td>
            </tr>
               ))}
               {request.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">Không có dữ liệu</td>
                    </tr>
                  )}
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
