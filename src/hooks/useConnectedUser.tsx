import { useState, useEffect, useCallback } from 'react'
import { initOnboard } from '../utils/web3'

export const useConnectedUser = () => {
  const [user, updateUser] = useState<string>('')
  useEffect(() => {
    initOnboard((address: string | undefined)=>{
      if(!address) {
        updateUser('')
      } else {
        updateUser(address)
      }
    })
  }, 
  [updateUser]);
  const setUser = useCallback((user: string): void => {
    updateUser(user)
  }, [])
 
  return { user, setUser }

}