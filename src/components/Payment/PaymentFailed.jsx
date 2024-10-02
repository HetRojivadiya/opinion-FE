import React from 'react';
import {Link} from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className="">
      <div className="bg-white p-6  my-20 md:mx-auto">
      <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M11.999 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.626 0 11.999 0zm5.657 16.97a1 1 0 01-1.414 0l-4.243-4.243-4.243 4.243a1 1 0 01-1.414-1.414l4.243-4.243-4.243-4.243a1 1 0 011.414-1.414l4.243 4.243 4.243-4.243a1 1 0 011.414 1.414l-4.243 4.243 4.243 4.243a1 1 0 010 1.414z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
          <p className="text-gray-600 my-2">
            Unfortunately, your transaction could not be processed.
          </p>
          <p>Please try again or contact support.</p>
          <div className="py-10 text-center">
            <Link to="/home" className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
              TRY AGAIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
