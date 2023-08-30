import moment, { Moment } from 'moment'

import { useEffect, useState } from 'react'

import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { EventType, TimeLinesType } from 'types'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { ProfileFormType } from '../../types'

interface Props {
  loading?: boolean
  data: TimeLinesType[]
  timelinesData: EventType[]
  updateTimelines: (data: ProfileFormType[]) => void
  isLoading?: boolean
}

type FromDataType = {
  name: string
  event_uuid: string
  from: Moment | null
  to: Moment | null
  place: string
  title: string
  description: string
}

const newTimelines = {
  event_uuid: '',
  name: '',
  from: null,
  to: null,
  place: '',
  title: '',
  description: '',
}

export default function Timelines({
  updateTimelines,
  data,
  timelinesData,
  loading,
  isLoading,
}: Props): JSX.Element {
  const [form] = Form.useForm<{ timelines: FromDataType[] }>()
  const [options, setOptions] = useState<{ value?: string; label: string; disabled?: boolean }[]>()
  const [optionValue, setOptionValue] = useState('')

  useEffect(() => {
    if (data) {
      const initFormData: FromDataType[] = data.map(x => {
        return {
          name: x.event.name,
          event_uuid: x.event.uuid || '',
          from: x.from ? moment(x.from) : null,
          to: x.to ? moment(x.to) : null,
          place: x.data.place,
          title: x.data.title,
          description: x.data.description,
        }
      })

      // const selectedTimelinesIds = initFormData.map(x => x.event_uuid)

      // const newOptions: OptionType[] = []

      // timelinesData?.forEach(x => {
      //   if (x.uuid && selectedTimelinesIds.includes(x.uuid)) {
      //     newOptions.push({
      //       label: x.name,
      //       value: x.uuid || '',
      //       disabled: true,
      //     })
      //   } else {
      //     newOptions.push({
      //       label: x.name,
      //       value: x.uuid || '',
      //     })
      //   }
      // })

      const newOptions = timelinesData?.map(x => {
        return {
          label: x.name,
          value: x.uuid || '',
        }
      })

      setOptions(() => newOptions)

      form.setFieldValue('timelines', initFormData)
    }
  }, [])

  const onFinishHandler = (formData: ProfileFormType): void => {
    const dataToSubmit = formData.timelines.map((x: FromDataType) => {
      return {
        event_uuid: x.event_uuid,
        from: x.from ? x.from.format('YYYY/MM/DD') : null,
        to: x.to ? x.to.format('YYYY/MM/DD') : null,
        value: {
          title: x.title,
          place: x.place,
          description: x.description,
        },
      }
    })

    updateTimelines(dataToSubmit)
  }

  const onDeleteHandler = (index: number, remove: (index: number | number[]) => void): void => {
    // const timeline = form.getFieldValue('timelines')[index]
    // const newOptions = options
    // const newOption = newOptions?.find(x => x.value === timeline.event_uuid)

    // if (newOption) {
    //   newOption.disabled = false
    // }

    // setOptions(() => newOptions)

    remove(index)
  }

  const onAddTimelineHandler = (): void => {
    let currentTimelines = form.getFieldValue('timelines')
    const event = timelinesData.find(x => x.uuid === optionValue)

    if (event) {
      const newTimeline = { ...newTimelines }
      newTimeline.event_uuid = event.uuid ? event.uuid : ''
      newTimeline.name = event.name ? event.name : ''
      currentTimelines = [newTimeline, ...currentTimelines]
      form.setFieldValue('timelines', currentTimelines)
    }

    // if (options) {
    //   const newOptions = options
    //   const indexInOptions = options.findIndex(x => x.value === optionValue)

    //   if (indexInOptions !== -1) {
    //     newOptions[indexInOptions].disabled = true
    //   }

    //   setOptions(() => [...newOptions])
    // }

    setOptionValue('')
  }

  return (
    <Form form={form} layout='vertical' onFinish={onFinishHandler}>
      <Card
        loading={loading}
        title='Timelines'
        actions={[
          <>
            <Button loading={isLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </>,
        ]}>
        <div style={{ marginBottom: 24 }}>
          <Select
            value={optionValue}
            onChange={value => setOptionValue(value)}
            options={options}
            style={{
              minWidth: 300,
              marginRight: 16,
            }}
          />
          <Button onClick={onAddTimelineHandler} icon={<PlusOutlined />}>
            Add timelines
          </Button>
        </div>
        {form.getFieldValue('timelines')?.length > 0 && (
          <Form.List name='timelines'>
            {(fields, { remove }) => (
              <>
                {fields?.map(({ key, name }) => (
                  <span key={key}>
                    <div style={{ marginBottom: 8, fontSize: 16 }}>
                      <span>{form.getFieldValue('timelines')[name].name}</span>
                      <Button
                        style={{ marginLeft: 16 }}
                        onClick={() => onDeleteHandler(name, remove)}
                        icon={<DeleteOutlined />}
                        danger
                      />
                    </div>
                    <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                      <Col span={4}>
                        <Form.Item name={[name, 'from']} label='From'>
                          <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name={[name, 'to']} label='To'>
                          <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name={[name, 'place']} label='Place'>
                          <Input maxLength={125} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name={[name, 'title']} label='Title'>
                          <Input maxLength={125} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name={[name, 'description']} label='Description'>
                      <TextArea />
                    </Form.Item>
                  </span>
                ))}
              </>
            )}
          </Form.List>
        )}
      </Card>
    </Form>
  )
}
