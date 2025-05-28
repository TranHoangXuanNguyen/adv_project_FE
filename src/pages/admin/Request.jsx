import { useState, useEffect } from "react";
import "../../assets/css/pages/request.css";
import axios from 'axios';
export default function Request() {
  const[request,setRequest]=useState([]);
  const [page, setPage] = useState(1);         // trang hiện tại
  const [lastPage, setLastPage] = useState(1); // tổng số trang
  
useEffect(() => {
  const fetchRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/requesthelp/paginate?page=${page}`);
      console.log("API response:", res.data);

      setRequest(res.data.data);
      setPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Not found ", error);
    }
  };

  fetchRequest();
}, [page]);

 const  handleDelete=async(id)=>{
    if (!window.confirm("Are you sure you want to delete?")) return;
    try{
          await axios.delete(`http://localhost:8000/api/requesthelp/${id}`);
           setRequest(prev => prev.filter(item=>item.id!==id));
    }catch(error){
      console.log("Delete failed:",error)
    }
  
 }

  return (
      <div className="col-md-9 w-100 content">
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
                <td className="fullname">{ item.sender.name}</td>
                <td className="content">{item.content}</td>
                <td className="datetime"> {item.created_at} 
                  </td>
              <td className="text-end">
                <button className="btn btn-sm btn-delete" onClick={()=>handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
               ))}
               {request.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">No data available</td>
                    </tr>
                  )}
          </tbody>
        </table>
      </div>
 {/* Phân trang */}
            <nav className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {/* Nút trang trước */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link"  onClick={() => setPage(page - 1)}  disabled={page === 1}  > «  </button>
                </li>

                {/* Số trang */}
                {Array.from({ length: lastPage }, (_, i) => (
                  <li key={i}className={`page-item ${page === i + 1 ? "active" : ""}`} >
                    <button     className="page-link"  onClick={() => setPage(i + 1)} >{i + 1} </button>
                  </li>
                ))}

                {/* Nút trang sau */}
                <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
                  <button className="page-link"  onClick={() => setPage(page + 1)}  disabled={page === lastPage}> »</button>
                </li>
              </ul>
            </nav>
    </div>
  </div>
</div>

    </div>
  )
}
