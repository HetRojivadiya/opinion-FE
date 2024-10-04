import {React,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';


const AboutPage = () => {

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
    <div className="p-4">
      
      <h1>about</h1>
    </div>
  );
};

export default AboutPage;
