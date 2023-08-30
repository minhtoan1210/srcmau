import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'

import { Button, Card, Form, InputNumber, Select, Tooltip } from 'antd'

import { forEach, xorBy } from 'lodash'

import { SkillType } from 'types'

import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { ProfileFormType } from '../../types'

interface Props {
  loading: boolean
  data: SkillType[]
  skillsData: SkillType[]
  onUpdateSkills: (data: ProfileFormType) => void
  isLoading?: boolean
}

export default function Skills({
  onUpdateSkills,
  data,
  skillsData,
  loading,
  isLoading,
}: Props): JSX.Element {
  const [form] = Form.useForm<ProfileFormType>()
  const [options, setOptions] = useState<{ value?: string; label: string; disabled?: boolean }[]>()
  const [skills, setSkills] = useState<SkillType[]>(data)
  const [optionValue, setOptionValue] = useState('')

  useEffect(() => {
    if (data) {
      const initFormData: ProfileFormType = {}

      const xorData = xorBy(data, skillsData, 'uuid')

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

      form.setFieldsValue(initFormData)
    }
  }, [data, skillsData])

  const onFinishHandler = (formData: ProfileFormType): void => {
    forEach(formData, (value, key) => {
      if (!value) {
        delete formData[key]
      }
    })

    onUpdateSkills(formData)
  }

  const onDeleteHandler = (uuid: string): void => {
    const newSkills = skills

    const indexOfSkill = newSkills.findIndex(x => x.uuid === uuid)

    if (indexOfSkill !== -1) {
      newSkills?.splice(indexOfSkill, 1)
    }

    setSkills(() => [...newSkills])

    if (options) {
      const newOptions = options
      const indexInOptions = options.findIndex(x => x.value === uuid)

      if (indexInOptions !== -1) {
        newOptions[indexInOptions].disabled = false
      }
      setOptions(() => [...newOptions])
    }

    form.setFieldValue(uuid, undefined)
  }

  const onAddSkillHandler = (): void => {
    if (optionValue) {
      form.setFieldValue(optionValue, 1)
      const skill = skillsData.find(x => x.uuid === optionValue)

      if (skill) {
        setSkills(oldState => [skill, ...oldState])
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
    <Form form={form} layout='vertical' onFinish={onFinishHandler}>
      <Card
        loading={loading}
        title='Skills'
        actions={[
          <>
            <Button loading={isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
            {/* <Button style={{ marginLeft: 8 }}>Cancel</Button> */}
          </>,
        ]}>
        <Select
          value={optionValue}
          onChange={value => setOptionValue(value)}
          options={options}
          style={{
            minWidth: 300,
            marginRight: 16,
          }}
        />
        <Button onClick={onAddSkillHandler} icon={<PlusOutlined />}>
          Add Skills
        </Button>

        {skills?.length > 0 &&
          skills.map(skill => {
            return (
              <div key={uuidv4()}>
                <Form.Item
                  className='skills-form'
                  name={skill.uuid}
                  label={skill.name}
                  extra={
                    <span style={{ margin: 8 }}>
                      <Button
                        onClick={() => skill.uuid && onDeleteHandler(skill.uuid)}
                        icon={<DeleteOutlined />}
                        danger
                        style={{ margin: 8 }}
                      />
                      <Tooltip title={skill.description}>
                        <ExclamationCircleOutlined
                          style={skill.description ? { cursor: 'pointer' } : {}}
                        />
                      </Tooltip>
                    </span>
                  }>
                  <InputNumber
                    min={1}
                    max={100}
                    style={{
                      width: 200,
                    }}
                  />
                </Form.Item>
              </div>
            )
          })}
      </Card>
    </Form>
  )
}
