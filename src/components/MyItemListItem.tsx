import styled from 'styled-components';
import React, { useState } from 'react';

const ItemContainer = styled.div`
  .profileImage {
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 5px;
  background-color: #FFFFFF;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #EBEBEB;
  }
  position: relative;
  width: 100%;
`;

const IconContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  img {
    width: 20px;
  }
  position: absolute;
  top: 80px;
  left: 80px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  p {
    color: #686868;
    font-size: 0.75rem;
  }
  .time {
    color: #686868;
    font-weight: 700;
  }
  .price {
    color: #DF5532;
    font-weight: 700;
  }
`;

const ItemTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
`;

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus?: boolean;
}

interface ItemProps {
  item: Item;
}

const MyItemListItem: React.FC<ItemProps> = React.memo(({ item }) => {
  const {
    contractId,
    itemName,
    itemImage,
    time,
    price,
    likeStatus: initialLikeStatus,
  } = item;

  const [likeStatus, setLikeStatus] = useState(initialLikeStatus || false);
  
  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  const toggleLikeStatus = () => {
    setLikeStatus(prevStatus => !prevStatus);
  };

  let imageSrc = itemImage;
  if (!imageSrc) {
    imageSrc = "/img/default-image.png";
  }

  return (
    <ItemContainer>
      <img className='profileImage' src = {imageSrc} alt = "item" />
      <ItemTitle>{itemName}</ItemTitle>
      <ItemInfoContainer>
        <p className='price'>{price} P</p>
        <p>|</p>
        <p className='time'>{time}시간</p>
      </ItemInfoContainer>
      <IconContainer visible={initialLikeStatus !== undefined}>
        <img src = {likeIconSrc} alt = "like" onClick={toggleLikeStatus} />
      </IconContainer>
    </ItemContainer>
  )
});

export default MyItemListItem;
