const AddTeacher = () => {
    return(
        <div className="col-md-9 content">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h4 className="student-titlte">Add new teacher</h4>
          <i className="fa fa-user-circle fa-2x header-icon" />
        </div>
        <div className="input-add mb-4">
          <input
            type="text"
            className="form-control me-4"
            placeholder="Enter teacher email"
          />
          <button className="btn btn-danger">Add new teacher</button>
        </div>
        <hr className="custom-divider mb-4 mt-3" />
        {/* Duplicate Student Info Cards for demo */}
        <div className="student-card-big">
          <h4 className="mb-4 student-titlte">Teacher information</h4>
          <div className="student-card">
            <div className="student-name">Xuan Nguyen</div>
            <div className="student-info-row">
              <div className="label">Subject:</div>
              <div className="value">English Teacher</div>
            </div>
            <div className="student-info-row">
              <div className="label">Email Address:</div>
              <div className="value">
                nguyen.tran26@student.passerellesnumeriques.com
              </div>
            </div>
            <div className="actions mt-2">
              <span className="btn-delete">
                <i className="fa fa-trash" /> DELETE
              </span>
              <span className="btn-edit">
                <i className="fa-solid fa-pen-to-square" /> EDIT
              </span>
            </div>
          </div>
        </div>
      </div>      
    )
}

export default AddTeacher