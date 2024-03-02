import React, { useState, useEffect } from "react";
import { SkillsStyle } from "./style";
import Tabela from "../../components/TabelaSkills";
import Botao from "../../components/Botao";
import { Modal, Button, Form } from "react-bootstrap";
import NavBar from "../../components/Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [tokenExists, setTokenExists] = useState(false);
  const [tabelaKey, setTabelaKey] = useState(0);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSkillChange = (event) => setSelectedSkill(event.target.value);

  const handleSaveSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = parseInt(localStorage.getItem("id"));

      const selectedSkillObj = skills.find(
        (skill) => skill.nome === selectedSkill
      );
      if (!selectedSkillObj) {
        console.error("Selected skill not found.");
        return;
      }
      const requestData = {
        usuarioId: userId,
        skillId: selectedSkillObj.id,
        level: 1,
      };
      const response = await axios.post(
        `http://localhost:8080/associacoes/associar`,
        requestData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Skill selecionada:", selectedSkill);
      const updatedSkills = [...skills, selectedSkillObj];
      setSkills(updatedSkills);

      handleCloseModal();
      setTabelaKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error associating skill:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        if (!token) {
          return <Navigate to="/" />;
        } else {
          setTokenExists(true);
          const response = await axios.get(`http://localhost:8080/skills`, {
            headers: {
              Authorization: token,
            },
          });
          setSkills(response.data);
          console.log("data", response.data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Selecione a skill</Form.Label>
              {skills.length > 0 ? (
                <Form.Control
                  as="select"
                  onChange={handleSkillChange}
                  className="formModal"
                >
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.nome}>
                      {skill.nome}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <p>Loading skills...</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveSkill}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <SkillsStyle>
        <h1>Tela de suas Skills</h1>
        <Botao texto={"Adicionar Skill"} action={handleShowModal} />
        <Tabela key={tabelaKey} />
      </SkillsStyle>
    </>
  );
}
