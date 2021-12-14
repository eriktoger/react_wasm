import { useState } from "react";
import useWASM from "./wasmHook";
import "./index.css";

function App() {
  const [cppTime, setCppTime] = useState(0);
  const [jsTime, setJsTime] = useState(0);
  const [cppAnswer, setCppAnswer] = useState(0);
  const [jsAnswer, setJsAnswer] = useState(0);
  const { nrOfPrimes } = useWASM();

  const nrOfPrimesJS = (limit) => {
    const primeNumbers = Array.from({ length: limit }, (_, k) => k);
    primeNumbers[0] = -1;
    primeNumbers[1] = -1;

    for (const prime of primeNumbers) {
      if (prime === -1) {
        continue;
      }
      for (let i = prime * prime; i < limit; i += prime) {
        if (i % prime == 0) {
          primeNumbers[i] = -1;
        }
      }
    }
    return primeNumbers.reduce((a, v) => (v !== -1 ? a + 1 : a), 0);
  };
  const limit = 100000000;
  const timeCPPFunction = () => {
    var t0 = performance.now();

    const answer = nrOfPrimes(limit);

    var t1 = performance.now();
    setCppTime(Math.round(t1 - t0));
    setCppAnswer(answer);
  };

  const timeJSFunction = () => {
    var t0 = performance.now();

    const answer = nrOfPrimesJS(limit);

    var t1 = performance.now();
    setJsTime(Math.round(t1 - t0));
    setJsAnswer(answer);
  };

  return (
    <div className="container">
      <p className="header">Finding nr of primes less than: {limit}</p>
      <button onClick={() => timeCPPFunction()}> CPP</button>
      <p> CPP Time (ms): {cppTime}</p>
      <p> CPP Answer: {cppAnswer}</p>
      <button onClick={() => timeJSFunction()}> JS</button>
      <p> JS Time (ms): {jsTime}</p>
      <p> JS Answer: {jsAnswer}</p>
    </div>
  );
}

export default App;
