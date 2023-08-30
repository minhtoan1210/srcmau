import { Link } from 'react-router-dom'

import './style.css'

export default function Page404(): JSX.Element {
  return (
    <div className='page-404'>
      <Link to='/'>
        <img src='/assets/logo-1.png' />
      </Link>
      <p className='erorr'>Sorry, the page you visited does not exist.</p>
    </div>
  )
}
