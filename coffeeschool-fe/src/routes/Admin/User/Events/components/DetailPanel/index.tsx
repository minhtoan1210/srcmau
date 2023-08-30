import { Descriptions } from 'antd'

import { EventType } from 'types'

interface DetailPanelProps {
  data?: EventType
}

function DetailPanel({ data }: DetailPanelProps): JSX.Element {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: '200px' }}>
      <Descriptions.Item label='Name'>
        <b> {data && data.name}</b>
      </Descriptions.Item>
      <Descriptions.Item label='Description'>
        <b> {data && data.description}</b>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default DetailPanel
