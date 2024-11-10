import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", contact: "" });
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/list");
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:3000/api/users/update/${currentUserId}`
      : "http://localhost:3000/api/users/add";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });

      if (response.ok) {
        alert(
          isEditing
            ? "Usuário atualizado com sucesso!"
            : "Usuário adicionado com sucesso!"
        );
        fetchUsers();
        setCurrentUser({ name: "", contact: "" });
        setIsEditing(false);
        setCurrentUserId(null);
      } else {
        alert("Erro ao salvar usuário.");
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchUsers();
          alert("Usuário excluído com sucesso!");
        } else {
          alert("Erro ao excluir usuário.");
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário.");
      }
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setCurrentUserId(user._id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="user-management-container">
      <h1>Gerenciamento de Usuários</h1>

      <form onSubmit={handleAddOrUpdateUser}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={currentUser.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contato:</label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={currentUser.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">
          {isEditing ? "Atualizar" : "Cadastrar Usuário"}
        </button>
      </form>

      <h2>Lista de Usuários</h2>
      {users.length > 0 ? (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id}>
              <span className="user-info">
                {user.name} - {user.contact}
              </span>
              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditUser(user)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
};

export default UserManagement;
