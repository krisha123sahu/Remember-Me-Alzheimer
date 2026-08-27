import { useState } from "react";

function AddMember() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [medicine, setMedicine] = useState("");
  const [food, setFood] = useState("");

  const saveMember = () => {
    if (!name || !relation) {
      alert("Please fill Name and Relation");
      return;
    }

    const member = {
      name: name.toLowerCase().trim(), // must match dataset image name
      relation: relation.trim(),
      medicine: medicine.trim(),
      food: food.trim()
    };

    let members = JSON.parse(localStorage.getItem("members")) || [];

    // 🚫 Prevent duplicate entries
    const exists = members.find(m => m.name === member.name);
    if (exists) {
      alert("Member already exists!");
      return;
    }

    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));

    alert("Member saved successfully!");

    // ✅ Clear form after saving
    setName("");
    setRelation("");
    setMedicine("");
    setFood("");
  };

  return (
    <div className="page">
      <div className="camera-card">
        <h1>Add Family Member</h1>

        <input
          className="input"
          placeholder="Name (same as dataset image)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Relation (Mother, Father...)"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />

        <input
          className="input"
          placeholder="Medicine Time (e.g. 8 PM)"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <input
          className="input"
          placeholder="Food Time (e.g. 1 PM)"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />

        <button onClick={saveMember}>
          Save Member
        </button>
      </div>
    </div>
  );
}

export default AddMember;