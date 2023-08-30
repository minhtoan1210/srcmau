import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'

import { Button, Card, Select } from 'antd'

import { xorBy } from 'lodash'

import { HobbyType } from 'types'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { ProfileFormType } from '../../types'

interface Props {
  loading: boolean
  data: HobbyType[]
  hobbiesData: HobbyType[]
  onUpdateHobbies: (data: string[]) => void
  isLoading?: boolean
}

export default function Hobbies({
  onUpdateHobbies,
  data,
  hobbiesData,
  loading,
  isLoading,
}: Props): JSX.Element {
  const [options, setOptions] = useState<{ value?: string; label: string; disabled?: boolean }[]>()
  const [hobbies, setHobbies] = useState<HobbyType[]>(data)
  const [optionValue, setOptionValue] = useState('')

  useEffect(() => {
    if (data) {
      const initFormData: ProfileFormType = {}

      const xorData = xorBy(data, hobbiesData, 'uuid')

      const newOptions = [
        ...data.map(x => ({
          label: x.name,
          value: x.uuid,
          disabled: true,
        })),
        ...xorData.map(x => ({
          label: x.name,
          value: x.uuid,
        })),
      ]

      setOptions(newOptions)

      data.forEach(value => {
        if (value.uuid) {
          initFormData[value.uuid] = value.value
        }
      })
    }
  }, [data, hobbiesData])

  const onFinishHandler = (): void => {
    onUpdateHobbies(
      hobbies.map(x => {
        return x.uuid ? x.uuid : ''
      })
    )
  }

  const onDeleteHandler = (uuid: string): void => {
    const newHobbies = hobbies

    const indexOfSkill = newHobbies.findIndex(x => x.uuid === uuid)

    if (indexOfSkill !== -1) {
      newHobbies?.splice(indexOfSkill, 1)
    }

    setHobbies(() => [...newHobbies])

    if (options) {
      const newOptions = options
      const indexInOptions = options.findIndex(x => x.value === uuid)

      if (indexInOptions !== -1) {
        newOptions[indexInOptions].disabled = false
      }
      setOptions(() => [...newOptions])
    }
  }

  const onAddSkillHandler = (): void => {
    if (optionValue) {
      const skill = hobbiesData.find(x => x.uuid === optionValue)

      if (skill) {
        setHobbies(oldState => [skill, ...oldState])
      }

      if (options) {
        const newOptions = options
        const indexInOptions = options.findIndex(x => x.value === optionValue)

        if (indexInOptions !== -1) {
          newOptions[indexInOptions].disabled = true
        }
        setOptions(() => [...newOptions])
      }

      setOptionValue('')
    }
  }

  return (
    <Card
      loading={loading}
      title='Hobbies'
      actions={[
        <>
          <Button loading={isLoading} type='primary' onClick={onFinishHandler}>
            Submit
          </Button>
          {/* <Button style={{ marginLeft: 8 }}>Cancel</Button> */}
        </>,
      ]}>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={optionValue}
          onChange={value => setOptionValue(value)}
          options={options}
          style={{
            minWidth: 300,
            marginRight: 16,
          }}
        />
        <Button disabled={hobbies?.length >= 3} onClick={onAddSkillHandler} icon={<PlusOutlined />}>
          Add Hobbies
        </Button>
      </div>
      {hobbies?.length > 0 &&
        hobbies?.map(hobby => {
          return (
            <div key={uuidv4()}>
              <span style={{ minWidth: 280, display: 'inline-block' }}>{hobby.name}</span>
              <Button
                onClick={() => hobby.uuid && onDeleteHandler(hobby.uuid)}
                icon={<DeleteOutlined />}
                danger
                style={{ margin: 8 }}
              />
            </div>
          )
        })}
    </Card>
  )
}
