import {React,useEffect} from 'react';
import BattingList from '../BattingList/BattingList';
import { Link , useNavigate } from 'react-router-dom';
import ImageCarousel from '../HomePage/ImageCarousel'; // Import the carousel component

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/checkToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Token is valid', data);
        } else {
          console.error('Invalid token', data);
          navigate('/');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);



  return (
    <div className="p-2">
      <section className="bg-gray-900 p-6 rounded shadow-md text-white flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-2/3">
          <h2 className="text-2xl mb-4">Welcome to Opinion Trading</h2>
          <p className="mb-4">Trade opinions and insights with others!</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Will Start Soon</button>
          <Link to='/about' className="text-blue-500 hover:text-blue-700 ml-4">About</Link>
        </div>
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <ImageCarousel />
        </div>
      </section>
      {/* Adding margin between Home section and BattingList */}
      <div className="mt-2">
        <BattingList />
      </div>
    </div>
  );
};

export default HomePage;
