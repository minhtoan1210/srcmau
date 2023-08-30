import { Descriptions } from 'antd'

import { CategoryType } from 'types'

interface DetailPanelProps {
  data?: CategoryType
}

function DetailPanel({ data }: DetailPanelProps): JSX.Element {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: '200px' }}>
      <Descriptions.Item label='Name'>
        <b> {data && data.name}</b>
      </Descriptions.Item>
      {/* <Descriptions.Item label='Slug'>
        <b> {data && data.slug}</b>
      </Descriptions.Item> */}
      <Descriptions.Item label='Entity'>
        <b> {data && data.entity}</b>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default DetailPanel
