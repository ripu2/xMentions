import * as React from 'react';

import { ListProps, UserType } from '../../types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ParentContainer } from './style';

const UserList = (props: ListProps) => {
  const {listData, onCellClick} = props;

  const onUserClick = React.useCallback((userName: string) => {
    onCellClick(userName);
  }, [onCellClick])

  const renderList = React.useMemo(() => {
    return listData.map((value: UserType) => {
      const labelId = `checkbox-list-label-${value}`;
      const userName = value.first_name + ' ' + value.last_name;
      return (
        <ListItem
          key={value.id}
          disablePadding
        >
          <ListItemButton style={{width: '100%'}} role={undefined} dense onClick={() => {
            onUserClick(userName)
          }}>
            <ListItemText style={{ color: 'black', width: '100%' }} id={labelId} primary={userName} />
          </ListItemButton>
        </ListItem>
      );
    })
  }, [listData, onUserClick])

  return (
    <ParentContainer>
      <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '300px', overflow: 'scroll' }}>
        {renderList}
      </List>
    </ParentContainer>
  );
}


export default React.memo(UserList)

