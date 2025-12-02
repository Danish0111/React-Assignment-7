import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, reset } from './counterSlice';
import { useEffect, useState } from 'react';
import { fetchUsers } from './userSlice';
import { Loader2, RefreshCcw } from "lucide-react"; // ⭐ Lucide Icons

function App() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-16">

      {/* ASSIGNMENT 1 */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Assignment 1 — Counter App</h1>

        <div className="flex flex-col gap-4 items-center">

          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-center focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />

          <div className="flex items-center gap-6 bg-gray-50 px-6 py-4 rounded-xl shadow-inner">
            <button
              onClick={() => dispatch(decrement(Number(amount)))}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-600 transition"
            >
              –
            </button>

            <div className="text-xl font-semibold text-gray-800">
              Count: {counter}
            </div>

            <button
              onClick={() => dispatch(increment(Number(amount)))}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-600 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={() => dispatch(reset())}
            className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Reset
          </button>

        </div>
      </div>

      {/* ASSIGNMENT 2 */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Assignment 2 — Users List</h1>

          {/* ⭐ Reload Button */}
          <button
            onClick={() => dispatch(fetchUsers())}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <RefreshCcw size={18} />
            Reload
          </button>
        </div>

        {status === "loading" && (
          <div className="flex items-center gap-3 text-gray-700 text-lg h-screen justify-center">
            <Loader2 className="animate-spin size-10" />
          </div>
        )}

        {status === "failed" && (
          <p className="text-red-500 font-semibold">Error: {error}</p>
        )}

        {status === "succeeded" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <div key={user.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-700">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
