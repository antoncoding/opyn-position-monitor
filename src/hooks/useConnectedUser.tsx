import { useState, useEffect, useCallback } from 'react'
import { initOnboard } from '../utils/web3'

export const useConnectedUser = () => {
  const [user, updateUser] = useState<string>('')
  useEffect(() => {
    initOnboard(updateUser)
  }, 
  [updateUser]);
  const setUser = useCallback((user: string): void => {
    updateUser(user)
  }, [])
 
  return { user, setUser }

}