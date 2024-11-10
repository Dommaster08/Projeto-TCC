import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
    status: "",
  });

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books/list");
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:3000/api/books/update/${currentBookId}`
      : "http://localhost:3000/api/books/add";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert(
          isEditing
            ? "Livro atualizado com sucesso!"
            : "Livro adicionado com sucesso!"
        );
        fetchBooks();
        setNewBook({ title: "", author: "", year: "", status: "" });
        setIsEditing(false);
        setCurrentBookId(null);
      } else {
        alert("Erro ao salvar livro.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar livro.");
    }
  };

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/books/delete/${bookToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchBooks();
          alert("Livro excluído com sucesso!");
        } else {
          alert("Erro ao excluir livro.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao excluir livro.");
      } finally {
        setBookToDelete(null);
      }
    }
  };

  const handleEditBook = (book) => {
    setNewBook(book);
    setIsEditing(true);
    setCurrentBookId(book._id);
  };

  const confirmDelete = (id) => {
    setBookToDelete(id);
  };

  const cancelDelete = () => {
    setBookToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gerenciador de Livros</h1>

      <form onSubmit={handleAddOrUpdateBook} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Título do Livro"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Autor do Livro"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="year"
            value={newBook.year}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ano"
            required
          />
        </div>
        <div className="mb-3">
          <select
            name="status"
            value={newBook.status}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, status: e.target.value }))
            }
            className="form-select"
            required
          >
            <option value="">Selecione o Status</option>
            <option value="Disponivel">Disponível</option>
            <option value="Indisponivel">Indisponível</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Atualizar Livro" : "Adicionar Livro"}
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.status}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditBook(book)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => confirmDelete(book._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum livro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {bookToDelete && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este livro?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDeleteBook}>
                  Confirmar
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManager;
