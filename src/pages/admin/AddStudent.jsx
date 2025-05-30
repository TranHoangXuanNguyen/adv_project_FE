import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/pages/student.css";
const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);
  const [page,setPage]=useState(1);
  const [lastPage,setLastPage]=useState(1);
  useEffect(() => {
    fetchStudent();
  }, [page]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/student/paginate?page=${page}`);
          console.log("Response:", response.data);
      setStudents(response.data.data.data); 

      setLastPage(response.data.data.last_page);
      console.log("Current page:", page);
      console.log("Students on this page:", response.data.data.data);

    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Lỗi khi tải danh sách học sinh");
    }
  };

  const handleAddStudent = async () => {
    if (!email) return alert("Email is required");

    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        email,
        role: "student",
      });

      alert("Student added successfully");
      setEmail("");
      fetchStudent();
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message || "Error occurred";
        alert("Error: " + message);
      } else {
        alert("Can not connect to server");
      }
    }
  };
  const handleDeleteStudent=async(id)=>{
      if (!id) {
    alert("Không thể xác định ID của học sinh cần xóa.");
    return;
  }

    const confirmDelete=window.confirm("Are you sure you want to delete this student ?");
    if(!confirmDelete)
      return;

    try{
        const  response =await axios.delete(`http://localhost:8000/api/users/${id}`);
        alert("Student deleted successfully");
        fetchStudent();
    }catch(error){
      if(error.response){
        alert("Error: " + error.response.data.message);
      }else{
        alert("Cannot connect to serve");
      }
    }
  };

  return (
    <div className="col-md-9 w-100  content">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="student-titlte text-2xl">Add new student</h4>
        <i className="fa fa-user-circle fa-2x header-icon" />
      </div>

      <div className="input-add mb-4">
        <input
          type="text"
          className="form-control me-4"
          placeholder="Enter student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleAddStudent}>
          Add new student
        </button>
      </div>

      <hr className="custom-divider mb-4 mt-3" />

      <div className="student-big">
        <h4 className="mb-4 student-titlte">Student information</h4>

        {students.length === 0 && <p>No students available.</p>}

        {students.map((student, index) => (
          <div key={index} className="student-card">
            <div className="student-name">{student.name || "No name"}</div>
            <div className="student-info-row">
              <div className="label">Class Name:</div>
              <div className="value">{student.class?.name || "N/A"}</div>
            </div>
            <div className="student-info-row">
              <div className="label">Email Address:</div>
              <div className="value">{student.email}</div>
            </div>
            <div className="actions mt-2">
              <span className="btn-delete" onClick={()=>handleDeleteStudent(student.user_id)}>
                <i className="fa fa-trash" /> DELETE
              </span>
              <span className="btn-edit">
                <i className="fa-solid fa-pen-to-square" /> EDIT
              </span>
            </div>
          </div>
        ))}
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
  );
};

export default AddStudent;
