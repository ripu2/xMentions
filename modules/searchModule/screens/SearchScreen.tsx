import Box  from '@mui/material/Box'
import { ParentContainer } from './styles'
import React from 'react'
import SearchBar from '../components/searchBar'

function SearchScreen() {
  return (
    <ParentContainer>
      <SearchBar />
    </ParentContainer>
  )
}

export default React.memo(SearchScreen)