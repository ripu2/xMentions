import { ChildContainer, InputField, ParentContainer } from './style'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UserType, ValueTrackerType } from '../../types';

import If from '../if';
import UserList from '../userList';
import { debounce } from 'lodash';
import stringManipulator from 'mentions/utils/utils';
import useUserSearch from '../../hooks/searchHook'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [allowUserSearch, setAllowUserSearch] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<UserType[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const { searchForUser } = useUserSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deb = useCallback(debounce((val: string) => {
    const res = searchForUser(val);
    setSearchResults(res);
  }, 2000), [])


  const userSearch = useCallback((searchValue: string) => {
    if(allowUserSearch) {
      deb(searchValue);
    }
  }, [allowUserSearch, deb])


  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    setSearchTerm(value)
    setAllowUserSearch(true)
    if (value.includes('@')) {
      userSearch(value);
    }
  }, [userSearch])

  const onUserSelection = useCallback((selectedUser: string) => {
    setAllowUserSearch(false);
    if(!selectedUsers.includes(selectedUser.split(" ").join("_")))setSelectedUsers([...selectedUsers, selectedUser.split(" ").join("_")])
    const newString = stringManipulator(searchTerm, selectedUser)
    setSearchTerm(newString)
    setSearchResults([]);
  }, [searchTerm, selectedUsers])


  return (
    <ParentContainer>
      <ChildContainer>
        <InputField
          value={
            searchTerm
          }
          autoComplete='false'
          placeholder='Mention'
          onChange={onTextChange}
        />
        <If condition={searchResults.length}>
          <UserList listData={searchResults} onCellClick={onUserSelection} />
        </If>
      </ChildContainer>
    </ParentContainer>
  )
}

export default React.memo(SearchBar)