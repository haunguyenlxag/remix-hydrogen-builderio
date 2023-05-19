import {useState} from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h4>{count}</h4>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
