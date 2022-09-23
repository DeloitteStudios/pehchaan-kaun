import React, { useState, useEffect, useRef } from 'react';
export default function Stateex({ title }) {
  const [val, changeVal] = useState(0);
  const [inp, changeInp] = useState('');
  const inputRef = useRef();
  function adder() {
    changeVal(val + 1);
  }
  useEffect(() => {
    console.log('THE ELEMENT HAS BEEN LODAED');
  }, []);
  //   useEffect(() => {
  //     console.log('inputval->', inp);
  //   });
  function changer() {
    changeInp(inputRef.current.value);
  }
  let buttonText = 'ADD VALUE';
  return (
    <div className="">
      <h1>{title}</h1>
      <h1>This is the state component</h1>
      <p>I'll be very glad if this works</p>
      <br></br>
      <button value="ADD" onClick={adder}>
        <h1>{buttonText}</h1>
      </button>
      <input placeholder="Enter something" ref={inputRef} onChange={changer} />
      <p>{val}</p>
      <p>{inp}</p>
    </div>
  );
}
