import { selectUserProfile } from 'store/UserSlice/selector'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './style.css'

export default function Footer(): JSX.Element {
  const [isExistRole, setIsExistRole] = useState<boolean>(true)

  const { roles } = useSelector(selectUserProfile)

  const content = roles[0]?.name

  useEffect(() => {
    window.location.pathname.split('/').find((value: any) => {
      if (value === 'management') {
        setIsExistRole(false)
      }
    })
  }, [])

  return (
    <footer className='footer footerAdmin'>
      <p> © Barista School 2022. All rights reserved.{isExistRole ? content : ''}</p>
    </footer>
  )
}
