import { Link, Outlet } from 'react-router-dom'; 
import { FaTachometerAlt, FaClipboardList, FaUsers } from 'react-icons/fa'; 


const AdminHomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-6 text-3xl font-bold text-center">
          <h1>Admin Panel</h1>
        </div>

        <nav className="space-y-2 px-4 py-6">
          <Link
            to="/admin/seeAllCategories"
            className="flex items-center text-lg text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <FaClipboardList className="mr-3" /> See All Categories
          </Link>
          
          <Link
            to="/admin/seeLiveContest"
            className="flex items-center text-lg text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <FaTachometerAlt className="mr-3" /> Live Contests
          </Link>
          <Link
            to="/admin/seeCompletedContest"
            className="flex items-center text-lg text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <FaClipboardList className="mr-3" /> Completed Contests
          </Link>
          <Link
            to="/admin/manageUsers"
            className="flex items-center text-lg text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <FaUsers className="mr-3" /> Manage Users
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6">
        <Outlet /> {/* Renders the component corresponding to the clicked link */}
      </div>
    </div>
  );
};

export default AdminHomePage;
