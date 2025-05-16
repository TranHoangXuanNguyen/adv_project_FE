import React from 'react'
import "../../assets/css/layouts/myClass.css";
import avatar from "../../assets/img/avatar.jpg";

function MyClass() {
  return (
    <div className="body">
    <div className="body-center">
      <div className="body-center-title">
        <div>
          <b>All Class</b>
        </div>
        <div className="count-class">
          <p className="count1">Class:</p>
          <p className="count2">6</p>
        </div>
      </div>
      <div className="body-center-list">
        <div className="list-students">
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
        </div>
        <div className="list-students">
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
          <div className="student">
            <div className="title-class">
              <h2>IT English 2</h2>
              <p>Nguyen T** TT</p>
              <div className="avatar-teacher">
                <img src={avatar} alt="" />
              </div>
            </div>
            <div className="content-class" />
            <div className="bottom-class">
              <div className="delete">
                <i className="fa-solid fa-trash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MyClass
