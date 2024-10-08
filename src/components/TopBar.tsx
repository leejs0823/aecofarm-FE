import styled from "styled-components";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const Header = styled.div`
  position: fixed;
  height: 50px;
  top: 50px;
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
  }
  z-index: 1000;
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 20px;
  img {
    width: 20px;
  }
`;

interface Props {
  text: string;
}

const TopBar: NextPage<Props> = ({ text }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Header>
      <p>{text}</p>
      <IconContainer onClick={handleBack}>
        <img src="/back.svg" alt="back" />
      </IconContainer>
    </Header>
  );
};

export default TopBar;
