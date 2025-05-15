import React from 'react';
import '../../assets/css/pages/classjournal.css';
const ClassJournal = () => {
  return (
    <>
      {/* Main Content */}
      <div className="main-content">
        <div className="top-controls">
          <div className="tab-buttons">
            <button type="button" className="btn-class">
              In class
            </button>
            <button type="button" className="btn-class">
              Self study
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={6} className="in-class-header">
                  IN CLASS
                </th>
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
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClassJournal;
