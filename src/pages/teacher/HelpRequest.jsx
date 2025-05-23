import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HelpRequest() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra xem user đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('user_id');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setMessage({ text: 'Please enter request content', type: 'error' });
      return;
    }

    if (!isAuthenticated) {
      setMessage({ text: 'Please login to submit a help request', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('access_token');
      
      const response = await axios.post('http://127.0.0.1:8000/api/help-requests', {
        content : content,
        sender_id: localStorage.getItem('user_id'),
        receiver_id: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage({ 
        text: 'Your request has been submitted successfully!', 
        type: 'success' 
      });
      setContent('');
    } catch (error) {
      let errorMsg = 'Failed to submit request';
      
      if (error.response) {
        console.error('Backend error:', error.response.data);
        
        if (error.response.status === 401) {
          errorMsg = 'Session expired. Please login again.';
          localStorage.removeItem('access_token');
          setIsAuthenticated(false);
        } 
        else if (error.response.status === 422) {
          // Xử lý lỗi validation từ Laravel
          const errors = error.response.data.errors;
          errorMsg = Object.values(errors)[0][0] || 'Validation error';
        } 
        else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      } else if (error.request) {
        errorMsg = 'No response from server. Please try again later.';
      } else {
        errorMsg = error.message;
      }

      setMessage({ 
        text: errorMsg, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Help Request Form</h2>
        
        {!isAuthenticated && (
          <div className="mb-6 p-4 rounded border bg-yellow-100 text-yellow-800 border-yellow-200">
            You need to login to submit a help request.
          </div>
        )}
        
        {message.text && (
          <div className={`mb-6 p-4 rounded border ${
            message.type === 'success' 
              ? 'bg-orange-100 text-orange-800 border-orange-200' 
              : 'bg-red-100 text-red-800 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 text-lg font-medium mb-3">
              Request Content *
            </label>
            <textarea
              id="content"
              rows={6}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-300
                        transition duration-200"
              placeholder="Please describe your issue in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting || !isAuthenticated}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-3 px-6 rounded-lg 
                      hover:bg-orange-600 focus:outline-none focus:ring-2 
                      focus:ring-orange-400 focus:ring-offset-2 transition 
                      duration-200 text-lg font-medium ${
                        isSubmitting || !isAuthenticated ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
            disabled={isSubmitting || !isAuthenticated}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        <div className="mt-6 text-base text-gray-500">
          <p className="font-medium">Notes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Detailed descriptions help us provide better support</li>
            <li>We'll respond to your request as soon as possible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}