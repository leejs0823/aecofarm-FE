"use client"
import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import TextInput from "../../components/TextInput";
import TagInput from "../../components/TagInput";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import TopBar from "@/components/TopBar";
import PostButton from "../../components/PostButton";
import axios from "axios";

interface ItemDetail {
    owner: boolean;
    userName: string;
    itemName: string;
    price: number;
    itemImage?: string;
    itemContents: string;
    itemPlace: string;
    itemHash: string[];
    time: number;
    contractTime: number;
    kakao: string;
    category?: string;
    file?: File | null;
  }


const UpdatePost = () => {


  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // 쿼리 파라미터로 받은 category
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { contractId } = useParams() as { contractId: string };
  const [itemDetail, setItemDetail] = useState<ItemDetail>({
    owner: false,
    userName: "",
    itemName: "",
    price: 0,
    itemContents: "",
    itemPlace: "",
    itemHash: [],
    time: 0,
    contractTime: 0,
    kakao: "",
    itemImage: "",
    file: null
  });
  const [hasHashWrapInner, setHasHashWrapInner] = useState(false);
  const token = localStorage.getItem('token');

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateContract = JSON.stringify({
      category: category,
      itemName: itemDetail.itemName,
      kakao: itemDetail.kakao,
      itemHash: tags,
      time: itemDetail.time,
      contractTime: itemDetail.contractTime,
      price: itemDetail.price,
      itemPlace: itemDetail.itemPlace,
      itemContents: itemDetail.itemContents
    });

    const blob = new Blob([updateContract], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append('updateContract', blob);

    if (file) {
      formData.append('file', file);
    } else {
      const emptyFile = new File([""], "empty.txt", {type: "text/plain"});
      formData.append('file', emptyFile);
    }
    setError(null);
    setLoading(true);
    try {
      
      const response = await axios.put(`/api/contract/update/${contractId}`, formData, {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        alert(response.data.message);
        if (category === "BORROW") {
          router.push(`/borrow-detail/${contractId}`);
        } else {
          router.push(`/lend-detail/${contractId}`);
        }
      } else {
        alert('글 수정에 실패하였습니다.');
      }
      
    } catch(err) {
      const errorMessage = (err as Error).message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hashWrapInnerElements = document.querySelectorAll(".HashWrapInner");
    setHasHashWrapInner(hashWrapInnerElements.length > 0);
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setItemDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if(!contractId)
      return;
    
    const fetchItemInfo = async () => {
      try {
        const responce = await axios.get(`/api/contract/detail/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const currentItem = responce.data.data;
        setItemDetail(currentItem);
        setTags(currentItem.itemHash);

        if (currentItem?.itemImage) {
          const response = await fetch(currentItem?.itemImage);
          const blob = await response.blob();
          const file = new File([blob], "itemImage.jpg", { type: blob.type });
          setFile(file);
        }
      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
          setError(errorMessage);
      }
    };
    fetchItemInfo();
  }, [contractId]);

  if (!itemDetail) return <div>contractId를 확인하세요</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemDetail(prevState => ({
          ...prevState,
          file: file,
          itemImage: reader.result as string
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageInput = (e: React.MouseEvent) => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const removeImage = () => {
    setItemDetail(prevState => ({
      ...prevState,
      file: null,
      itemImage: ""
    }));
  };

  return(
    <MainLayout>
      <TopBar text="글 수정하기" />
      <Wrapper>
        <Form onSubmit={updatePost}>
        <Category>
          {category === "BORROW" ? (
            <p>빌려주고 싶어요</p>
           ) : (
            <p>빌리고 싶어요</p>
           )}
        </Category>
        <InputContainer>
        {category === "BORROW" && (
          <ImageInputContainer>
          <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }}/>
          <label htmlFor="file" onClick={handleImageInput}>
            <ImagePreview>
                {itemDetail.itemImage ? (
                  <img src={itemDetail.itemImage} alt="Image Preview" />
                ) : (
                  <p>이미지 선택</p>
                )}
            </ImagePreview>
            {itemDetail.itemImage && (
              <RemoveButton onClick={removeImage}>
                <img src="/remove-icon.svg" alt="remove" />
              </RemoveButton>
            )}
          </label>
        </ImageInputContainer>
        )}
        <TextInput
          placeholder="상품명"
          name="itemName"
          value={itemDetail.itemName}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={itemDetail.kakao}
          onChange={handleInputChange}
          type="text"
          required

        />
        <TagInput placeholder="해시태그 입력" onChange={handleTagsChange}/>
        <TextInput
          placeholder="가격"
          name="price"
          value={String(itemDetail.price)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <TextInput
          placeholder="거래 가능 장소"
          name="itemPlace"
          value={itemDetail.itemPlace}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TextInput
          placeholder="거래 가능 시간"
          name="contractTime"
          value={String(itemDetail.contractTime)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <TextInput
          placeholder="대여 가능 시간"
          name="time"
          value={String(itemDetail.time)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요." value={itemDetail?.itemContents} name="itemContents" onChange={handleInputChange}/>
        </ItemInfoContainer>
        </InputContainer>
      <PostButton text="수정하기"/>
      </Form>
      </Wrapper>
    </MainLayout>
  );
};

const Category = styled.div`
  font-size: 0.8rem;
  height: 30px;
  color: var(--black);
  border-bottom: 1px solid var(--gray6);
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
`;


const ItemInfoContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 10px 0;
  p {
    font-size: 1rem;
    color: var(--gray6);
  }
  textarea {
    height: 100%;
    width: 100%;
    background-color: var(--white);
    border: none;
    color: var(--gray6);
    font-size: 1rem;
    &::placeholder {
      color: var(--gray4);
    }
    outline: 0;
  }
`;

const ImageInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
`;

const ImagePreview = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  align-items: center;
  background-color: var(--gray5);
  overflow: hidden;
  border-radius: 10px;
  p {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  img { 
    width: 30px;
    height: 30px;
  }
`;


export default UpdatePost;