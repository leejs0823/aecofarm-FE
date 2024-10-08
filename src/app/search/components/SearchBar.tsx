// components/SearchBar.tsx
"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const SearchContainer = styled.div`
  background-color: white;
  border: 0.5px solid ${({ theme }) => theme.colors.gray3};
  width: 90%;
  max-width: 400px;
  border-radius: 50px;
  display: flex;
  flex: 1;
  margin: 15px 20px 15px 27px;
  align-items: center;
`;

const SearchImg = styled.img`
  padding: 10px 20px;
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  padding: 3px;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray6};
  flex: 1;
  background-color: white;
`;

const SearchButton = styled.button`
  width: 60px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 50px;
  border: 0px;
  color: white;
  padding: 7px 0;
  font-size: 15px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange2};
    color: white;
  }
`;

interface SearchBarProps {
  initialData?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialData = "" }) => {
  const [query, setQuery] = useState<string>(initialData);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <SearchContainer>
      <SearchImg src="/img/search-icon.svg" alt="Search Icon" />
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;
