import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { useEffect, useState } from 'react';
import { fetchUsers } from './userSlice';

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
    <>
      <h1>Assignment 1</h1>
      <input type="number" onChange={(e) => setAmount(Number(e.target.value))} value={amount} />
      <div className="card">
        <button onClick={() => dispatch(decrement(Number(amount)))}>-</button>
        <div className="">count is {counter}</div>
        <button onClick={() => dispatch(increment(Number(amount)))}>+</button>
      </div>

      <h1>Assignment 2</h1>
      <div style={{ padding: "20px" }}>
        <h1>User List</h1>

        {status === "loading" && <p>Loading users...</p>}

        {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

        {status === "succeeded" &&
          users.map((user) => (
            <div key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <hr />
            </div>
          ))}
      </div>
    </>
  )
}

export default App
