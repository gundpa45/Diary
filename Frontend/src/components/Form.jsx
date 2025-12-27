import React, { useState } from "react";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [allData, setAllData] = useState([]);

  function submitHandler(e) {
    e.preventDefault();

    const oldUser = {
      name: userName,
      email: userEmail,
      age: userAge,
    };

    setAllData([...allData, oldUser]);

    setUserName("");
    setUserEmail("");
    setUserAge("");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Age"
          required
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {allData.map((data, index) => (
          <h1 key={index}>
            {data.name} || {data.age} || {data.email} || hello jee 
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Form;
