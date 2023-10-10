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
  const [searchResults, setSearchResults] = useState<UserType[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])


  const [mentionTerm, setMentionTerm] = useState<string>('')
  const [allowNew, setAllowNew] = useState(false);

  const { searchForUser } = useUserSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deb = useCallback(debounce((val: string) => {
    const res = searchForUser(`@${val}`);
    setSearchResults(res);
  }, 2000), [])


  const mapSearchTerm = useCallback((searchChar: string) => {  
    if(searchChar === null) {
      setMentionTerm(mentionTerm.slice(0, -1))
    } else {
      setMentionTerm(mentionTerm+searchChar);
    }
  }, [mentionTerm])


  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    if(e.nativeEvent?.data === '@') {
      setAllowNew(true);
    }  
    if(allowNew) {
      mapSearchTerm(e.nativeEvent?.data)
    }
    setSearchTerm(value)
  }, [allowNew, mapSearchTerm])

  const onUserSelection = useCallback((selectedUser: string) => {
    setSearchResults([]);
    setMentionTerm('');
    setAllowNew(false);
    const stringInput = searchTerm.split(" ");
    stringInput[stringInput.length - 1] = `@${selectedUser}`
    setSearchTerm(stringInput.join(" "));
  }, [searchTerm])

  useEffect(() => {
    if(mentionTerm.length) {
      deb(mentionTerm);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentionTerm])


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