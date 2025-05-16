import React, { useEffect, useState } from 'react';
import '../../assets/css/pages/classjournal.css';
import axios from 'axios';

const ClassJournal = () => {
  const[showForm,setShowForm]=useState(false);
  const [subjects, setSubjects] = useState([]);
  const [formData, setForm] = useState({
        user_id: "",         
        subject_id: "",      
        week_track_id: "",   
        date:"",
        subject:"",
        learned:"",
        challenges:"",
        solution:"",
        solved:""
  });
  const[ShowInfor, setShowInfor]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/classplan');
        setShowInfor(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy data:', error);
      }
    };
    fetchData();
  }, []);
  

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm((preveState)=>({
      ...preveState,
      [name]:value
    }));
  };

    const handleSubmit=(e)=>{
      e.preventDefault();
      
      axios.post('http://127.0.0.1:8000/api/classplan', formData)
      .then(() => {
        setShowInfor((prev) => [...prev, formData]);
      setForm({
        date: "",
        subject: "",
        learned: "",
        challenges: "",
        solution: "",
        solved: ""
      });
    
      setShowForm(false);
    });
    };

  return (
    <>
      {/* Main Content */}
      <div className="main-content">
        <div className="top-controls">
          <div className="tab-buttons">
            <button type="button" className="btn-class">In class</button>
            <button type="button" className="btn-class"> Self study</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={6} className="in-class-header">IN CLASS</th>
              </tr>
              <tr>
                <th>Date</th>
                <th>Skill/Subject</th>
                <th>What I learned today</th>
                <th>Challenges faced</th>
                <th>How to solve</th>
                <th>Problem solved</th>
              </tr>
            </thead>
            <tbody>
            {ShowInfor.map((infor, index)=>(
              <tr key={index}>
                <td> {infor.date}</td> 
                <td>{infor.subject}</td> 
                <td>{infor.learned}</td> 
                <td>{infor.challenges}</td> 
                <td>{infor.solution}</td> 
                <td>{infor.solved}</td> 
              </tr>
            ))}
            </tbody>
          </table>

          {/*Add Button */}
          <div className="form-add-btn">
            <button type="button" className="btn-class-add" onClick={openForm}>
              <i className="fa-solid fa-plus" />
            </button>
          </div>

          {/* Popup Form */}
          {showForm && (
            <div className="popup-overlay" >
              <div className="form-container popup-form">
                <div className="form-title">
                <span className="title-text">Learning Notes</span>
                <button type="submit" className="button-exist" onClick={closeForm}>
                    <i className="fa-solid fa-x"></i>
                </button>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Hàng 1 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}  required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Skill/Subject</label>
                      <select  type="text"  id="subject" name="subject"  className="form-control" value={formData.subject} onChange={handleChange} placeholder="IT English, English..." ><option value="">-- Select Subject --</option>
                          <option value="ENGLISH">ENGLISH</option>
                          <option value="IT ENGLISH">IT ENGLISH</option>
                          <option value="SPEAKING">SPEAKING</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="learned">What I learned today</label>
                      <textarea   id="learned"  name="learned"   value={formData.learned} onChange={handleChange} placeholder="What did you learn today?"  required  />
                    </div>
                  </div>
                  {/* Hàng 2 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="challenges">Challenges faced</label>
                      <textarea id="challenges"name="challenges"  value={formData.challenges} onChange={handleChange}  placeholder="What challenges did you face?"  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="solution">How to solve</label>
                      <textarea  id="solution"name="solution"   value={formData.solution} onChange={handleChange}   placeholder="How did you handle them?" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="solved">Problem solved</label>
                      <textarea  id="solved"  name="solved" value={formData.solved} onChange={handleChange}  placeholder="What did you manage to solve?"   />
                    </div>
                  </div>
                  <button type="submit" className="submit-btn"> Save</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassJournal;
