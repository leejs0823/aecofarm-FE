import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DonateLabel from "./DonateLabel";
import { useRouter } from "next/navigation";
import LikeButton from "./LikeButton";
import SkeletonPost from "./skeleton/SkeletonBorrowItemPost";
import Image from "next/image";

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: 10px 10px;
  position: relative;
  display: flex;
  max-width: 480px;
  width: 100%;
  justify-content: center;
  cursor: pointer;
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  overflow: hidden;
  position: relative;
`;

const ItemInfo = styled.div`
  width: 70%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 90%;
  justify-content: space-between;
`;

const Title = styled.div`
  color: black;
  font-size: 19px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  align-items: flex-start;
  display: block;
  width: 100%;
  text-align: left;
`;

const Place = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray6};
  display: flex;
  align-items: flex-start;
  gap: 8px;
  div {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  width: 100%;
`;

const TimeAndPrice = styled.p`
  font-size: 14px;
  color: black;
  font-weight: 400;
`;

const HashTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HashTag = styled.span`
  background-color: white;
  color: ${({ theme }) => theme.colors.orange2};
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

interface Post {
  contractId: number;
  itemId?: number;
  itemName: string;
  itemImage?: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance?: number;
  lowPrice?: number;
  highPrice?: number;
}

interface BorrowItemPostProps {
  post: Post;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BorrowItemPost: React.FC<BorrowItemPostProps> = ({ post, onClick }) => {
  const {
    contractId,
    itemId,
    itemName,
    itemImage,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    likeStatus,
    donateStatus,
  } = post;

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  let imageSrc = itemImage || "/img/default-image.png";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <SkeletonPost />;
  }

  return (
    <Container data-contract-id={contractId.toString()} onClick={onClick}>
      <ItemImage>
        <Image src={imageSrc} alt={itemName} layout="fill" objectFit="cover" />
      </ItemImage>
      <ItemInfo>
        <TitleContainer>
          <Title>{itemName}</Title>
          {donateStatus && <DonateLabel />}
        </TitleContainer>
        <TimeAndPrice>
          {time}시간 | {price}P
        </TimeAndPrice>
        <Place>
          <div>
            <Image
              src="/img/location-pin.svg"
              alt="location pin"
              width={14}
              height={14}
            />{" "}
            {itemPlace}
          </div>
          <div>
            <Image
              src="/img/clock-icon.svg"
              alt="clock"
              width={14}
              height={14}
            />{" "}
            {contractTime}분 이내 거래 가능
          </div>
        </Place>
        <HashTags>
          {itemHash.map((tag, index) => (
            <HashTag key={index}>#{tag}</HashTag>
          ))}
        </HashTags>
      </ItemInfo>
      <LikeButton
        top={10}
        right={15}
        size={24}
        contractId={contractId}
        itemId={itemId}
        likeStatus={likeStatus}
        type="borrow"
      />
    </Container>
  );
};

export default BorrowItemPost;
