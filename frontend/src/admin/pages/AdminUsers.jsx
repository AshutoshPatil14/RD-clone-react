import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    console.log(res)
    setUsers(res.data.users);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>

      <div className="admin-users-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.fname}{" "}{u.lname}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
