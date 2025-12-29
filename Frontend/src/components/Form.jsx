import React, { useEffect, useState } from "react";

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

  // 🔹 Fetch users on page load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8000/user");
        const data = await res.json(); // ✅ FIXED
        setAllData(data);              // ✅ ARRAY STORED
      } catch (error) {
        console.log("fetch error:", error);
      }
    }

    fetchUser(); // ✅ FUNCTION CALLED
  }, []);        // ✅ RUNS ONLY ONCE

  // 🔹 Submit form
  async function submitHandler(e) {
    e.preventDefault();

    const newUser = {
      name: userName,
      email: userEmail,
      age: userAge,
      mobile_no: userMobile,
      color: selectedColor,
    };

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const savedUser = await response.json();

      // ✅ Update UI immediately
      setAllData((prev) => [...prev, savedUser]);

      // ✅ Reset form
      setUserName("");
      setUserEmail("");
      setUserAge("");
      setUserMobile("");
      setSelectedColor(colors[0].value);
    } catch (error) {
      console.error("save error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100  text-slate-800 flex flex-col items-center py-10 px-4">
      
      {/* Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Phone Diary
        </h2>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={userMobile}
            onChange={(e) => setUserMobile(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Age"
            required
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          {/* Color Picker */}
          <div>
            <p className="text-sm mb-2">Select Card Color</p>
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
            className="bg-gray-900 text-white py-2 rounded-lg"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User Cards */}
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allData.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl text-slate-800 shadow-md overflow-hidden"
          >
            <div className={`${user.color} h-2`} />

            <div className="p-5">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm">📧 {user.email}</p>
              <p className="text-sm">📱 {user.mobile_no}</p>
              <p className="text-sm">🎂 Age: {user.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
