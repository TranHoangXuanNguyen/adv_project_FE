import { useState, useEffect } from "react";
import axios from "axios";
const AddTeacher = () => {
  const [email, setEmail] = useState("");
  const [teachers, setTeacher] = useState([]);
  const [page,setPage]=useState(1);
  const [lastPage,setLastPage]=useState(1);

  useEffect(() => {
    fetchTeacher();
  }, [page]);

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/teacher/paginate?page=${page}`);

      setTeacher(response.data.data.data);
      setLastPage(response.data.data.last_page);

    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  const handleAddTeacher = async () => {
    if (!email) return alert("Email is required");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {
        email,
        role: "teacher",
      });
      console.log(response.data);
      setTeacher([...teachers, response.data]);
      setEmail("");
      alert("Teacher added successfully");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert("You are not a Admin");
        } else {
          alert("Error: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Can not connect to server, please try again later");
      }
      console.error("Error adding class:", error);
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

    const handleDeleteTeacher=async(id)=>{
      if (!id) {
    alert("Không thể xác định ID của học sinh cần xóa.");
    return;
  }

    const confirmDelete=window.confirm("Are you sure you want to delete this student ?");
    if(!confirmDelete)
      return;

    try{
        const  response =await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
        alert("Student deleted successfully");
        fetchTeacher();
    }catch(error){
      if(error.response){
        alert("Error: " + error.response.data.message);
      }else{
        alert("Cannot connect to serve");
      }
    }
  };
  return (
    <div className="col-md-9 content w-100">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="student-titlte text-2xl">Add new teacher</h4>
        <i className="fa fa-user-circle fa-2x header-icon" />
      </div>
      <div className="input-add mb-4">
        <input
          type="text"
          className="form-control me-4"
          placeholder="Enter teacher email"
          value={email}
          onChange={onChange}
        />
        <button className="btn btn-danger" onClick={handleAddTeacher}>
          Add new teacher
        </button>
      </div>
      <hr className="custom-divider mb-4 mt-3" />
      {/* Duplicate Student Info Cards for demo */}
      <div className="student-big">
        <h4 className="mb-4 student-titlte">Teacher information</h4>
        {teachers.length === 0 ? (
          <p>No teachers available.</p>
        ) : (
          teachers.map((teacher, index) => (
            <div className="student-card" key={index}>
              <div className="student-name">{teacher.name || "Unnamed"}</div>
              <div className="student-info-row">
                <div className="label">Subject:</div>
                <div className="value">{teacher.subject || "Unknown"}</div>
              </div>
              <div className="student-info-row">
                <div className="label">Email Address:</div>
                <div className="value">{teacher.email}</div>
              </div>
              <div className="actions mt-2">
                <span className="btn-delete" onClick={()=>handleDeleteTeacher(teacher.user_id)}>
                  <i className="fa fa-trash" /> DELETE
                </span>
                <span className="btn-edit">
                  <i className="fa-solid fa-pen-to-square" /> EDIT
                </span>
              </div>
            </div>
          ))
        )}
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

export default AddTeacher;
