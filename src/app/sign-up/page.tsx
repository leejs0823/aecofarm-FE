'use client';
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import Popup from '@/components/Popup';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
`;

const Container = styled.div`
  width: 100%; 
  padding: 0 32px; 
  box-sizing: border-box; 
  margin-top: 20px;
`;

const TextContainer = styled.h3`
  color: black;
  padding: 15px 0;
  font-size: 22px;
  text-align: left;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenProfileInput = styled.input`
  display: none;
`;

const CustomProfileInputLabel = styled.label`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 10px 15px 10px;
  border: 1px solid var(--gray3);
  color: var(--orange2);
  font-size: 17px;

  &:hover {
    background: var(--orange2);
    color: #fff;   
    border: none;
  }
`;

const DefaultProfile = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border: 1px solid var(--gray3);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
`;

const DefaultProfileImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover; 
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 11px;
  object-fit: cover;
`;

const DeleteImage = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  border: 1px solid var(--gray3);
  color: var(--orange2);
  font-size: 16px;

  &:hover {
    background: var(--orange2);
    color: #fff;   
    border: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 420px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 470px;
  padding-right: 40px;
`;

const Button = styled.input`
  width: 100%;
  padding: 15px 22px;
  border-radius: 15px;
  border: 0px;
  color: var(--gray6);
  background-color: var(--gray2);
  font-size: 17px;
  text-align: left;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const PasswordIcon = styled.img`
  position: absolute;
  right: 15px; 
  width: 23px;
  cursor: pointer;
`;

interface UserData {
  email: string;
  userName: string;
  password: string;
  phone: string;
  schoolNum: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    userName: '',
    password: '',
    phone: '',
    schoolNum: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D+/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      const [, part1, part2, part3] = match;
      return [part1, part2, part3].filter(Boolean).join('-');
    }
    return value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedPhoneNumber = formatPhoneNumber(value);
      setUserData({ ...userData, [name]: formattedPhoneNumber });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleClick = () => {
    router.push('/login');
  };

  const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  const handleSignUp = async () => {
    const { email, userName, password, phone, schoolNum } = userData;

    if (!email || !userName || !password || !phone || !schoolNum) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    const formData = new FormData();

    if (profileImage) {
      formData.append('file', profileImage, profileImage.name);
    } else {
      const defaultImageBlob = await urlToBlob('/img/aeco-logo.svg');
      formData.append('file', defaultImageBlob, 'defaultProfileImage.jpg');
    }

    formData.append('signupData', new Blob([JSON.stringify(userData)], { type: 'application/json' }));

    try {
      const response = await axios.post('/api/member/signup', formData);

      if (response.data.code === 200) {
        handleOpenPopup();
      } else {
        alert(`회원가입에 실패하였습니다. ${response.data.message}`);
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <AppLayout>
      <NoFixedTopBar text='회원가입'/>
      <Wrapper>
        <Container>
          <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
          <ProfileContainer>
            {profileImage ? (
              <ProfileImage src={URL.createObjectURL(profileImage)} alt="Profile Image" />
            ) : (
              <DefaultProfile>
                <DefaultProfileImage src="/img/aeco-logo.svg" alt="Default Profile Image" />
              </DefaultProfile>
            )}
            <HiddenProfileInput type="file" accept=".jpg" id="profileImage" onChange={handleImageChange} />
            <div>
              <CustomProfileInputLabel htmlFor="profileImage">사진 선택</CustomProfileInputLabel>
              <DeleteImage onClick={handleRemoveImage}>기본 이미지로 변경</DeleteImage>
            </div>
          </ProfileContainer>
        </Container>
        <Container>
          <TextContainer>정보를 입력해주세요</TextContainer>
          <ButtonContainer>
            <Button type='text' placeholder="이름" name="userName" required onChange={handleInputChange} />
            <Button type='tel' placeholder="전화번호" name="phone" required value={userData.phone} onChange={handleInputChange} />
            <Button type='email' placeholder="이메일" name="email" required onChange={handleInputChange} />
            <PasswordInputContainer>
              <Button
                type='password'
                placeholder="비밀번호"
                name="password"
                required
                value={userData.password}
                onChange={handleInputChange}
                type={isPasswordVisible ? 'text' : 'password'}
              />
              <PasswordIcon
                src={isPasswordVisible ? '/img/eye-open.svg' : '/img/eye-closed.svg'}
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
              />
            </PasswordInputContainer>
            <Button type='text' placeholder="학교번호" name="schoolNum" required onChange={handleInputChange} />
            <OrangeButton text="회원가입" onClick={handleSignUp} />
          </ButtonContainer>
        </Container>
        {isPopupOpen && (
          <Popup text="회원가입이 완료되었습니다!" onClose={handleClosePopup} />
        )}
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
