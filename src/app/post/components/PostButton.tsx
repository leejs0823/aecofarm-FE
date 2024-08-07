import styled from "styled-components";
import React from "react";
import { useRouter } from "next/navigation";

interface PostButtonProps {
    text: string;
    onClick?: () => void;
}

const PostButton: React.FC<PostButtonProps> = ({text, onClick}) => {
  const router = useRouter();

  return (
    <PostButtonContainer>
        <NoticeButton>상품 등록 시 유의사항을 확인하세요.</NoticeButton>
        <Button onClick={onClick} type="submit">
          {text}
        </Button>
        
      </PostButtonContainer>
  );
};

const PostButtonContainer = styled.div`
  max-width: 500px;
  width: 100%;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  gap: 10px;
  position: fixed;
  bottom: 0px;
  background-color: var(--white);
  left: 50%;
  transform: translateX(-50%);
`;

const NoticeButton = styled.p`
  font-size: 0.9rem;
  text-decoration: underline;
  color: #000000;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #FF9B3F;
  width: 30%;
  height: 40px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 15px;
  color: #FFFFFF;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border: none;
`;

export default PostButton;