import styled from "styled-components";

export const SkillsStyle = styled.div`
  background: linear-gradient(to top, #434abb, #504b4b);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: -1;
  color: white;

  .formModal {
    select {
      color: black;
    }
  }
`;
