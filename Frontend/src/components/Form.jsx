import React, { useState } from "react";

const colors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Yellow", value: "bg-yellow-500" },
];

const Form = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [allData, setAllData] = useState([]);

  function submitHandler(e) {
    e.preventDefault();

    const newUser = {
      name: userName,
      email: userEmail,
      age: userAge,
      mobile: userMobile,
      color: selectedColor,
    };

    setAllData([...allData, newUser]);

    setUserName("");
    setUserEmail("");
    setUserAge("");
    setUserMobile("");
    setSelectedColor(colors[0].value);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      
      {/* Form Section */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Phone Diary
        </h2>

        <form
          className="flex flex-col gap-4 text-gray-800"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={userMobile}
            onChange={(e) => setUserMobile(e.target.value)}
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Age"
            required
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Color Selector */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Select Card Color
            </p>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setSelectedColor(c.value)}
                  className={`w-7 h-7 rounded-full ${c.value} ${
                    selectedColor === c.value
                      ? "ring-4 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allData.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className={`${user.color} h-2`} />

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                📧 {user.email}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                📱 {user.mobile}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                🎂 Age: {user.age}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
