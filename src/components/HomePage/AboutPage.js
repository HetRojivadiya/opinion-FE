import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        const response = await fetch('https://opinion-be.onrender.com/checkToken', {
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
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Our Application</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold mb-4">What is Opinion Trading?</h2>
          <p className="text-lg leading-relaxed">
            Welcome to our Opinion Trading Application! Our platform allows you to participate in exciting
            betting opportunities where you can place bets on various leagues, contests, and sports. By predicting
            outcomes, you can earn real money. It’s a unique way to engage with your favorite sports while earning
            and learning. From popular leagues to niche contests, there’s always something for you!
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Bet on various sports and contests.</li>
            <li>Earn money from successful predictions.</li>
            <li>Engage with real-time data and odds.</li>
            <li>Place bets quickly and efficiently with secure payment options.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-4">If you have any questions, feel free to reach out to us through the following channels:</p>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="mr-4">📧 Email:</span>
              <a href="mailto:support@opiniontrading.com" className="text-blue-400 hover:underline">
                support@opiniontrading.com
              </a>
            </div>
            <div className="flex items-center">
              <span className="mr-4">📱 Instagram:</span>
              <a href="https://www.instagram.com/opiniontrading" className="text-blue-400 hover:underline">
                @opiniontrading
              </a>
            </div>
            <div className="flex items-center">
              <span className="mr-4">📱 Facebook:</span>
              <a href="https://www.facebook.com/opiniontrading" className="text-blue-400 hover:underline">
                @opiniontrading
              </a>
            </div>
            <div className="flex items-center">
              <span className="mr-4">🔗 LinkedIn:</span>
              <a href="https://www.linkedin.com/company/opiniontrading" className="text-blue-400 hover:underline">
                Opinion Trading
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
