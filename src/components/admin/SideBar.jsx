import { Outlet, Link } from 'react-router-dom';
const SideBar  = () => {
    return( <div className="col-md-3 sidebar">
        <div className="text-center">
          <img
            src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/274020013_4365387626894386_2341052036053873144_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHNPj5KOVeSRugB7jT8v8eCm3rDF9sGHGabesMX2wYcZvIExXyEbqGSvlLpf8bXtdLXJRsdhPMGgZclZvCP0AQc&_nc_ohc=uEJ_FYcjCJ0Q7kNvwHqjQA_&_nc_oc=Adkwfy-OZ4eZg1JJWv30nO5yCRkT9nCTIdTGioTcyNqkRW9IMCQY1JqVe2eproCpnpE&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=wV6I19gxYnoXONGxTg9qbA&oh=00_AfIf-ZGpK-EZNpxLFIrTIzZzwfs4e59qv-Bg0YJ_DkoqFw&oe=68202927"
            alt="logo"
            className="img-fluid rounded-circle"
            style={{ width: 40 }}
          />
          <h3 className="mt-2">Admin Page</h3>
        </div>
        <hr className="bg-white" />


        <Link to="/admin" className="sub-sidebar text-decoration-none">
        <i className="fa fa-home" />
        <p>Dashboard</p>
      </Link>
      <Link to="/admin/addclass" className="sub-sidebar text-decoration-none">
        <i className="fa fa-users" />
        <p>Class Management</p>
      </Link>
      <Link to="/admin/addstudent" className="sub-sidebar text-decoration-none">
        <i className="fa fa-user" />
        <p>Student Management</p>
      </Link>
      <Link to="/admin/addteacher" className="sub-sidebar text-decoration-none">
        <i className="fas fa-chalkboard-teacher" />
        <p>Teacher Management</p>
      </Link>
            <Link to="/admin/request" className="sub-sidebar text-decoration-none">
        <i className="fa-solid fa-bullhorn"></i>
        <p>Notification</p>
      </Link>
      </div>)
       

}

export default SideBar




