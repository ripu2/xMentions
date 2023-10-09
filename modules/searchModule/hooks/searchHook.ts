import { SearchParamsType, UserType } from "../types";

import { useCallback } from "react"

const userData: UserType[] = require('../../../utils/data.json');

function useUserSearch() {
  const searchForUser = useCallback((userName: string) => {
    const searchQuery = userName.split("@")[1];
    const userNameSplit = searchQuery.split(" ");

    let userObj: SearchParamsType = {
      firstName: userNameSplit[0]
    }
    if(userNameSplit.length > 1){
      userObj = {
        ...userObj,
        lastName: userNameSplit.slice(1).join(' ')
      }
    }

    let selectedUsers = userData.filter((user: UserType) => {
      if(user.first_name.toLowerCase().includes(userObj.firstName.toLowerCase())) return true;
    })
    
    if(selectedUsers.length > 1 && userObj.lastName){
      selectedUsers = userData.filter((user: UserType) => {
        if(user.first_name.toLowerCase().includes(userObj.firstName.toLowerCase()) && userObj?.lastName && user.last_name.toLowerCase().includes(userObj.lastName.toLowerCase())) return true;
      })
    }
  
    return selectedUsers;

  }, [])

  return {searchForUser};
}

export default useUserSearch;