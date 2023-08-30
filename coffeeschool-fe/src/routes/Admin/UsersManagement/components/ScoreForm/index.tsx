import { useEffect } from 'react'

import { Col, Collapse, Form, FormInstance, Input, InputNumber, Row, Space } from 'antd'

import { AssignmentItemType } from 'types'

import { CheckCircleTwoTone } from '@ant-design/icons'

const { Panel } = Collapse

interface Props {
  name: string[]
  form: FormInstance<any>
}

const renderCriteriaItems = (criteria: AssignmentItemType, criteriaNames: number): JSX.Element => {
  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={6}>
        Title: {criteria.title}
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
        Max Score: {criteria.maxScores}
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
        Coefficient: {criteria.coefficient}
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
        Positive:{' '}
        <CheckCircleTwoTone
          style={{ paddingLeft: 8 }}
          twoToneColor={criteria.positive ? '#52c41a' : 'red'}
        />
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={6}>
        <Form.Item name={[criteriaNames, 'scores']} label='Scores'>
          <InputNumber max={criteria.maxScores} defaultValue={0} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default function ScoreFrom({ name, form }: Props): JSX.Element {
  useEffect(() => {
    const currentFormValue = form.getFieldValue(name)

    if (currentFormValue) {
      form.setFieldValue(name, { ...currentFormValue })
    }
  }, [form])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Space style={{ marginRight: 16 }}>
          <b>Max Scores:</b>
          {form.getFieldValue([...name, 'max_scores'])}
        </Space>
        <Space>
          <b>Scores to pass:</b>
          {form.getFieldValue([...name, 'scores_to_pass'])}
        </Space>

        <Form.Item style={{ display: 'none' }} name={[...name, 'max_scores']} label='Max Scores: '>
          <InputNumber style={{ marginRight: 20 }} disabled maxLength={3} />
        </Form.Item>

        <Form.Item style={{ display: 'none' }} name={[...name, 'labelName']} label='Label'>
          <Input maxLength={124} />
        </Form.Item>

        <Form.Item
          style={{ display: 'none' }}
          name={[...name, 'scores_to_pass']}
          label='Scores to pass'
          required>
          <InputNumber disabled maxLength={3} />
        </Form.Item>
      </div>

      <Form.List name={[...name, 'children']}>
        {fields => (
          <Collapse style={{ marginTop: 16, marginBottom: 16 }} collapsible='icon'>
            {fields.map(({ key: key1, name: name1 }) => (
              <Panel
                header={
                  <div style={{ display: 'flex' }}>
                    <b style={{ marginRight: 8 }}>Reviews section name:</b>
                    {form.getFieldValue([...name, 'children'])[name1].category}
                  </div>
                }
                key={key1}>
                <Form.List name={[name1, 'children']}>
                  {fields => (
                    <>
                      {fields.length > 0 &&
                        fields.map(({ key: key2, name: groupCriteriaNames }) => (
                          <span key={key2}>
                            <Space style={{ marginBottom: 16 }}>
                              <b>Criteria Group Name:</b>
                              {
                                form.getFieldValue([...name, 'children'])[name1].children[
                                  groupCriteriaNames
                                ].category
                              }
                            </Space>

                            <Form.List name={[groupCriteriaNames, 'children']}>
                              {fields => (
                                <>
                                  <Row gutter={[16, 16]}>
                                    {fields.map(({ key: key3, name: criteriaNames }) => (
                                      <Col span={12} key={key3}>
                                        <div className='score-form-criteria'>
                                          {renderCriteriaItems(
                                            form.getFieldValue(name)['children'][name1]['children'][
                                              groupCriteriaNames
                                            ]['children'][criteriaNames] as AssignmentItemType,
                                            criteriaNames
                                          )}
                                        </div>
                                      </Col>
                                    ))}
                                  </Row>
                                </>
                              )}
                            </Form.List>
                          </span>
                        ))}
                    </>
                  )}
                </Form.List>
              </Panel>
            ))}
          </Collapse>
        )}
      </Form.List>
    </>
  )
}
