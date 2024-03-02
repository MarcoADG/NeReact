import React, { useState, useEffect } from "react";
import axios from "axios";
import { TabelaStyle } from "./style";

export default function Tabela() {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        const response = await axios.get(
          `http://localhost:8080/associacoes/usuario/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSkills(response.data);
        console.log("resposta", response.data[0].imagem);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleLevelChange = (id, event) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return {
          ...skill,
          level: event.target.value,
        };
      }
      return skill;
    });
    setSkills(updatedSkills);
  };

  const handleKeyPress = (id, event) => {
    if (event.key === "Enter") {
      const skillToUpdate = skills.find((skill) => skill.id === id);
      if (!skillToUpdate) {
        console.error("Skill not found.");
        return;
      }

      const { id: skillId, level } = skillToUpdate;
      const usuarioId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const requestData = {
        usuarioId,
        skillId,
        level,
      };

      axios
        .put(`http://localhost:8080/associacoes/${id}`, requestData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("Skill updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating skill:", error);
        });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/associacoes/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Skill deleted successfully with ID:", id);

      const userId = localStorage.getItem("id");
      const response = await axios.get(
        `http://localhost:8080/associacoes/usuario/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSkills(response.data);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const prevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = skills.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TabelaStyle striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nome</th>
            <th>Level</th>
            <th>Descrição</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((skill) => (
            <tr key={skill.id} className="line">
              <td>
                <img
                  src={skill.imagem}
                  alt={skill.nome}
                  style={{ width: "30%", height: "auto" }}
                />
              </td>
              <td>{skill.nome}</td>
              <td>
                <input
                  type="text"
                  value={skill.level}
                  onChange={(e) => handleLevelChange(skill.id, e)}
                  onKeyPress={(e) => handleKeyPress(skill.id, e)}
                  className="inputTabela"
                />
              </td>
              <td>{skill.descricao}</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  width="20"
                  height="20"
                  onClick={() => handleDelete(skill.id)}
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </TabelaStyle>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={nextPage} disabled={indexOfLastItem >= skills.length}>
          Próxima
        </button>
      </div>
    </>
  );
}
