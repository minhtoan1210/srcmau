import { useParams } from 'react-router-dom'

import EditFull from 'routes/Admin/EditAccountInfo/EditFull'

export default function UserEitPage(): JSX.Element {
  const { id } = useParams()

  return <EditFull id={id} />
}
