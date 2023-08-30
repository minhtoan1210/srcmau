import { Descriptions } from 'antd'

import { SkillType } from 'types'

interface DetailPanelProps {
  data?: SkillType
}

function DetailPanel({ data }: DetailPanelProps): JSX.Element {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: '200px' }}>
      <Descriptions.Item label='Name'>
        <b> {data && data.name}</b>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default DetailPanel
