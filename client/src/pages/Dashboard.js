import { useEffect, useState } from "react";

function Dashboard() {
  const [person, setPerson] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const last = JSON.parse(localStorage.getItem("lastPerson"));
    const allMembers = JSON.parse(localStorage.getItem("members")) || [];

    setPerson(last);
    setMembers(allMembers);
  }, []);

  // 🗑 DELETE FUNCTION
  const deleteMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);

    localStorage.setItem("members", JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
  };

  return (
    <div className="page">
      <div className="camera-card">
        <h1>🧠 Memory Dashboard</h1>

        {/* Last Identified */}
        <div className="card">
          <h2>Last Identified</h2>

          {person ? (
            <div>
              <p><strong>Name:</strong> {person.name}</p>
              <p><strong>Relation:</strong> {person.relation}</p>
              <p>💊 Medicine: {person.medicine}</p>
              <p>🍽 Food: {person.food}</p>
            </div>
          ) : (
            <p>No person detected yet</p>
          )}
        </div>

        {/* All Members */}
        <div className="card">
          <h2>All Family Members</h2>

          {members.length > 0 ? (
            members.map((m, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <p><strong>{m.name}</strong> ({m.relation})</p>
                <p>💊 {m.medicine} | 🍽 {m.food}</p>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteMember(index)}
                  style={{
                    marginTop: "5px",
                    padding: "6px 12px",
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No members added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;