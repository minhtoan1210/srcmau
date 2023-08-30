import { Descriptions } from 'antd'

import { HobbyType } from 'types'

interface DetailPanelProps {
  data?: HobbyType
}

function DetailPanel({ data }: DetailPanelProps): JSX.Element {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: '200px' }}>
      <Descriptions.Item label='Name'>
        <b> {data && data.name}</b>
      </Descriptions.Item>
      <Descriptions.Item label='Icon'>
        <span>
          <img width={20} src={`/assets/${data && data.icon.file_name}`} />
        </span>
      </Descriptions.Item>
      <Descriptions.Item label='Description'>
        <b>{data && data.description}</b>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default DetailPanel
