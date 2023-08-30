import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import {
  AutoComplete,
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Row,
} from 'antd'

import { debounce, sumBy } from 'lodash'

import { AssignmentItemType, QueryParamsType } from 'types'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { getAssignmentItems } from 'services/assignmentServices'

import { renderCriteriaItems } from '../AssignmentDetailFrom'

const { Panel } = Collapse

interface Props {
  name: string[]
  form: FormInstance<any>
  labelName: string
}

export default function ScoreFrom({ name, form, labelName }: Props): JSX.Element {
  const [maxScores, setMaxScores] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const addAssignmentItemRef = useRef<any>()
  const [selectedItem, setSelectedItem] = useState<AssignmentItemType>()

  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['title'],
  })

  const { data } = useQuery(['getAssignmentItems', paramQueryModel], () =>
    getAssignmentItems(paramQueryModel)
  )

  useEffect(() => {
    const currentFormValue = form.getFieldValue(name)

    if (currentFormValue) {
      setMaxScores(currentFormValue.maxScores)
      form.setFieldValue(name, { ...currentFormValue, labelName })
    } else if (labelName) {
      form.setFieldValue(name, { labelName })
    }
  }, [form, labelName])

  const maxScoreCalculation = (): void => {
    const currentFormValue = form.getFieldValue(name)
    let allCriteria: any[] = []

    if (currentFormValue && currentFormValue.children) {
      currentFormValue.children.forEach(({ children }: any) => {
        children.forEach(({ children }: any) => {
          allCriteria = [...allCriteria, ...children]
        })
      })
    }

    const maxScores = sumBy(allCriteria, function (o) {
      if (o.positive) {
        return o.maxScores * o.coefficient
      }

      return 0
    })

    form.setFieldValue(name, { ...currentFormValue, max_scores: maxScores })
    setMaxScores(maxScores)
  }

  const searchAssignmentItemsDebounce = debounce((value: string) => {
    setParamQueryModel(values => ({ ...values, search: value }))
  }, 300)

  const handleOk = (): void => {
    if (selectedItem) {
      addAssignmentItemRef.current({
        item_uuid: selectedItem.uuid,
        maxScores: selectedItem.max_score,
        title: selectedItem.title,
        coefficient: selectedItem.coefficient,
        positive: selectedItem.positive,
      })

      maxScoreCalculation()
    }

    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setParamQueryModel(values => ({ ...values, search: undefined }))
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title='Select assignment item'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <AutoComplete
          placeholder='Select assignment item'
          onSelect={(_, option) => {
            setSelectedItem(option.item)
          }}
          onSearch={(value: string) => searchAssignmentItemsDebounce(value)}
          options={data?.data.items.map((item: any) => ({
            value: item.title,
            label: item.title,
            item: item,
          }))}
          style={{ width: '100%' }}
        />
      </Modal>

      <div style={{ display: 'flex' }}>
        <span style={{ marginRight: 20, paddingTop: 4 }}>Max Scores: {maxScores || 0}</span>

        <Form.Item style={{ display: 'none' }} name={[...name, 'max_scores']} label='Max Scores'>
          <InputNumber defaultValue={0} maxLength={3} />
        </Form.Item>

        <Form.Item style={{ display: 'none' }} name={[...name, 'labelName']} label='Label'>
          <Input defaultValue={''} maxLength={124} />
        </Form.Item>

        <Form.Item
          name={[...name, 'scores_to_pass']}
          label='Scores to pass'
          required
          rules={[
            {
              required: true,
              message: 'Please enter your Scores!',
            },
          ]}>
          <InputNumber defaultValue={0} maxLength={3} />
        </Form.Item>
      </div>

      <Form.List name={[...name, 'children']}>
        {(fields, { remove, add }) => (
          <>
            <Collapse collapsible='icon'>
              {fields.map(({ key: key1, name: name1 }) => (
                <Panel
                  header={
                    <div style={{ display: 'flex' }}>
                      <Form.Item
                        style={{ flex: 1, marginRight: 20 }}
                        // name={[name1, 'title']}
                        name={[name1, 'category']}
                        required
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Reviews section name',
                          },
                        ]}
                        label='Reviews section name'>
                        <Input maxLength={124} />
                      </Form.Item>
                      <Button onClick={() => remove(name1)} icon={<DeleteOutlined />} danger />
                    </div>
                  }
                  key={key1}>
                  {/* <Form.List name={[name1, 'groupCriteria']}> */}
                  <Form.List name={[name1, 'children']}>
                    {(fields, { remove: removeGroupCriteria, add: addGroupCriteria }) => (
                      <>
                        {fields.length > 0 &&
                          fields.map(({ key: key2, name: groupCriteriaNames }) => (
                            <span key={key2}>
                              <div style={{ display: 'flex' }}>
                                <Form.Item
                                  style={{ flex: 1, marginRight: 20 }}
                                  // name={[groupCriteriaNames, 'name']}
                                  name={[groupCriteriaNames, 'category']}
                                  required
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter your Criteria Group Name!',
                                    },
                                  ]}
                                  label='Criteria Group Name'>
                                  <Input maxLength={124} />
                                </Form.Item>
                                <Button
                                  onClick={() => removeGroupCriteria(groupCriteriaNames)}
                                  icon={<DeleteOutlined />}
                                  danger
                                />
                              </div>
                              {/* <Form.List name={[groupCriteriaNames, 'criteria']}> */}
                              <Form.List name={[groupCriteriaNames, 'children']}>
                                {(fields, { remove: removeCriteria, add: addCriteria }) => (
                                  <>
                                    <Row gutter={[16, 16]}>
                                      {fields.map(({ key: key3, name: criteriaNames }) => (
                                        <Col span={12} key={key3}>
                                          <div className='score-form-criteria'>
                                            {renderCriteriaItems(
                                              form.getFieldValue(name)['children'][name1][
                                                'children'
                                              ][groupCriteriaNames]['children'][
                                                criteriaNames
                                              ] as AssignmentItemType,
                                              criteriaNames,
                                              () => removeCriteria(criteriaNames)
                                            )}

                                            {/* <Form.Item
                                              // style={{ flex: 3 }}
                                              style={{ display: 'none' }}
                                              name={[criteriaNames, 'title']}
                                              label='Criteria'>
                                              <Input maxLength={124} disabled />
                                            </Form.Item> */}

                                            {/* <Form.Item
                                              style={{ display: 'none' }}
                                              name={[criteriaNames, 'positive']}
                                              label='Positive'
                                              valuePropName='checked'>
                                              <Checkbox />
                                            </Form.Item> */}

                                            {/* <Form.Item
                                              style={{ display: 'none' }}
                                              name={[criteriaNames, 'maxScores']}
                                              label='Max Scores'>
                                              <InputNumber
                                                onChange={maxScoreCalculation}
                                                disabled
                                              />
                                            </Form.Item>

                                            <Form.Item
                                              // style={{ flex: 2 }}
                                              style={{ display: 'none' }}
                                              name={[criteriaNames, 'coefficient']}
                                              label='Coefficient'>
                                              <InputNumber
                                                style={{ display: 'none' }}
                                                onChange={maxScoreCalculation}
                                                disabled
                                              />
                                            </Form.Item> */}
                                          </div>
                                        </Col>
                                      ))}
                                      <Col span={12}>
                                        <Form.Item>
                                          <Button
                                            style={{ marginTop: 20 }}
                                            type='dashed'
                                            onClick={() => {
                                              setIsModalOpen(true)
                                              addAssignmentItemRef.current = addCriteria
                                            }}
                                            block
                                            icon={<PlusOutlined />}>
                                            Add Criteria
                                          </Button>
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                    <Divider />
                                  </>
                                )}
                              </Form.List>
                            </span>
                          ))}
                        <Form.Item>
                          <Button
                            style={{ marginTop: 20 }}
                            type='dashed'
                            onClick={() => {
                              addGroupCriteria()
                            }}
                            block
                            icon={<PlusOutlined />}>
                            Add Group Criteria
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Panel>
              ))}
            </Collapse>

            <Form.Item>
              <Button
                style={{ marginTop: 20 }}
                type='dashed'
                onClick={() =>
                  add({
                    // title: 'new Group Criteria',
                    // groupCriteria: [],
                    category: 'new Group Criteria',
                    children: [],
                  })
                }
                block
                icon={<PlusOutlined />}>
                Add Group Criteria
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  )
}
