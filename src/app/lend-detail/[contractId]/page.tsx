'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';
import NoFixedTopBar from '@/components/NoFixedTopBar';

interface ItemDetail {
  contractId: number;
  itemName: string;
  userName: string;
  itemContent: string;
  kakao: string;
  price: number;
  itemPlace: string;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
}

const Container = styled.div`
  background-color: white;
  border: 1px solid var(--gray3);
  padding: 20px;
  position: relative;
  max-width: 440px;
  width: 90%;
  border-radius: 10px;
  margin: 20px;
  max-height: 700px;
  margin: auto;

`;

const ItemInfo = styled.div`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: 600;
`;

const User = styled.div`
  font-size: 17px;
  font-weight: 500;

  span {
    padding: 0 10px;
  }

  img, span {
    vertical-align: middle;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  border-radius: 30px;
  border: 1px solid var(--gray3);
`;

const Place = styled.div`
  font-size: 17px;
  color: var(--gray6);

  display: flex;
  
  img {
   margin-right: 2px;  
  }

  div {
   margin-left: 7px;
  }
`;


const Content = styled.div`
  font-size: 17px;
  color: var(--gray6);
  font-weight: 400;
  margin: 15px 0 10px;
`;

const TimeAndPrice = styled.p`
  font-size: 17px;
  color: black;
  font-weight: 400;
`;

const HashTags = styled.div`
  padding: 10px 0;
`;

const HashTag = styled.span`
  background-color: white;
  color: var(--orange2);
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 15px;
`;

const LikeIcon = styled.img`
  position: absolute;
  top: 30px;
  right: 45px;
  width: 25px;
  height: 30px;
  cursor: pointer;
`;

const LendButton = styled.a`
  background-color: white;
  color: var(--orange2);
  padding: 12px 15px;
  margin: 10px 5px;
  border: 1px solid var(--gray3);
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: var(--orange2);
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  padding: 20px;
`;


const LendDetailPage = () => {
  const { contractId } = useParams();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    if (!contractId) {
      return; // Exit if itemId is not yet defined
    }

    // Fetch the item detail using itemId
    const fetchItemDetail = async () => {
      // Replace with your API call
      const exampleData: ItemDetail[] = [
        {
          "contractId": 123456,
          "itemName": "맥북 맥세이프 충전기",
          "userName": "서은정",
          "itemContent": "초고속 멀티 충전기 급구합니다 ㅠㅠㅠ제발료 저를 살려주세여 저 충전기 없으면안대여 저 컴공 나는 컴공 ㄷㄷ 이정도 써주고 ...",
          "kakao": "https://open.kakao.com/o/s37YOrBg",
          "price": 3000,
          "itemPlace": "경영관",
          "time": 5,
          "contractTime": 10,
          "itemHash": ["eunjeong", "맥북프로", "충전기"],
          "likeStatus": true,
          "donateStatus": false,
        },
        {
          "contractId": 789012,
          "itemName": "아이패드 에어 4",
          "userName": "서은정",
          "itemContent": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
          "kakao": "https://open.kakao.com/o/s37YOrBg",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime": 10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
          "likeStatus": false,
          "donateStatus": true,
        },
        {
          "contractId": 789013,
          "itemName": "아이패드 에어 4",
          "userName": "서은정",
          "itemContent": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
          "kakao": "https://open.kakao.com/o/s37YOrBg",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime":10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
          "likeStatus": false,
          "donateStatus": true,
        },
        {
          "contractId": 789014,
          "itemName": "아이패드 에어 4",
          "userName": "서은정",
          "itemContent": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
          "kakao": "https://open.kakao.com/o/s37YOrBg",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime":10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
          "likeStatus": false,
          "donateStatus": true,
        },
        {
          "contractId": 789015,
          "itemName": "아이패드 에어 4",
          "userName": "이정선",
          "itemContent": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
          "kakao": "https://open.kakao.com/o/s37YOrBg",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime":10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
          "likeStatus": false,
          "donateStatus": true,
        }
        ];
      const item = exampleData.find((item) => item.contractId === Number(contractId));
      setItemDetail(item || null);
      if (item) {
        setLikeStatus(item.likeStatus);
      }
    };

    fetchItemDetail();
  }, [contractId]);

  const toggleLikeStatus = () => {
    setLikeStatus(prevStatus => !prevStatus);
  };

  if (!itemDetail) {
    return (
      <AppLayout>
        <Header />
        <MainLayout>
          <DetailContainer>Loading item details...</DetailContainer>
        </MainLayout>
        <Navigation />
      </AppLayout>
    );
  }

  const {
    itemName,
    userName,
    itemContent,
    kakao,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    donateStatus

  } = itemDetail;

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  return (
    <AppLayout>
      <Header/>
        <MainLayout>
          <NoFixedTopBar text=''/>
            <Container>
              <ItemInfo>
                <TitleContainer>
                  <Title>{itemName}</Title>
                </TitleContainer>
                <User><ProfileImg src='/img/aco-profile.svg'/><span>{userName}</span></User>
                <Content>{itemContent}</Content>
                <HashTags>
                  {itemHash.map((tag, index) => (
                    <HashTag key={index}>#{tag}</HashTag>
                  ))}
                </HashTags>
                <TimeAndPrice>{time}시간 대여 희망 | {price}P</TimeAndPrice>
                <Place>
                  <img src='/img/location-pin.svg' alt='location pin'/> {itemPlace}
                  <div>
                    <img src='/img/clock-icon.svg' alt='clock'/> {contractTime}분 이내 거래 희망
                  </div>
                </Place>
              </ItemInfo>
            <LikeIcon src={likeIconSrc} alt='like icon' onClick={toggleLikeStatus} />
            <ButtonContainer>
              <LendButton href={kakao} target="_blank">
                오픈채팅 바로가기
              </LendButton>
              <LendButton onClick={() => console.log('Lend item')}>
                빌려주기
              </LendButton>
            </ButtonContainer>
          </Container>
        </MainLayout>
      <Navigation />
    </AppLayout>
  );
};

export default LendDetailPage;
