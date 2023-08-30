import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Card, Checkbox, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { TitleType } from 'types'

import { getTitles } from 'services/titleServices'

interface Props {
  title?: TitleType
  updateUserInfo: (data: {
    title_uuid: string | null
    about: string
    name: string
    open_to_work: boolean
  }) => void
  about?: string
  isLoading?: boolean
  name?: string
  openToWork?: boolean
}

export default function UserInfo({
  updateUserInfo,
  title,
  name,
  about,
  openToWork,
  isLoading,
}: Props): JSX.Element {
  const [newTitle, setNewTitle] = useState<string>()
  const [newAbout, setNewAbout] = useState(about || '')
  const [newName, setNewName] = useState(name || '')
  const [newOpenToWork, setNewOpenToWork] = useState(openToWork || false)

  const { data: titlesData } = useQuery(['getTitles'], () =>
    getTitles({ 'where[is_published]': 1 })
  )

  useEffect(() => {
    if (title) {
      setNewTitle(title.uuid)
    }
  }, [title])

  const onUpdateAddressHandler = (): void => {
    updateUserInfo({
      title_uuid: newTitle || null,
      about: newAbout,
      name: newName,
      open_to_work: newOpenToWork,
    })
  }

  return (
    <Card
      title='User Info'
      actions={[
        <>
          <Button loading={isLoading} onClick={onUpdateAddressHandler} type='primary'>
            Submit
          </Button>
        </>,
      ]}>
      <div>
        <div>Title</div>
        <Select
          value={newTitle}
          style={{ width: 250 }}
          allowClear
          onChange={e => setNewTitle(e)}
          options={titlesData?.data.items.map((title: TitleType) => {
            return {
              value: title.uuid,
              label: title.name,
            }
          })}
        />
        <Checkbox
          style={{ marginLeft: 8 }}
          checked={newOpenToWork}
          onChange={e => {
            setNewOpenToWork(e.target.checked)
          }}>
          Open to work
        </Checkbox>
      </div>
      <div style={{ marginTop: 16 }}>
        <div>Name</div>
        <Input
          title='Name'
          maxLength={124}
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <div>About</div>
        <TextArea
          title='About'
          maxLength={512}
          value={newAbout}
          onChange={e => setNewAbout(e.target.value)}
        />
      </div>
    </Card>
  )
}
