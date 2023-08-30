import { Link } from 'react-router-dom'

import { TitleType } from 'types'

type Props = {
  name: string
  date: string
  img: string
  id: string
  properties: any
  title: TitleType | null
  address: any
  open_to_work: boolean
}

export default function ListItem({
  name,
  img,
  id,
  title,
  address,
  open_to_work,
}: Props): JSX.Element {
  return (
    <div className='items'>
      <div className='item'>
        <div className='item-left'>
          <div className='item-left_img'>
            <Link to={`/portfolios/${id}`}>
              <img src={img} alt='' width={200} height={200} />
            </Link>
          </div>
          <div className='item-left_information'>
            <div className='item-information_name'>
              <Link to={`/portfolios/${id}`}>{name}</Link>
            </div>
            <div className='item-information_location'>
              {title && (
                <span style={{ marginRight: 8 }} className='information-location_name'>
                  {title?.name}
                </span>
              )}

              {open_to_work && (
                <span className='status'>
                  <img src='./assets/promotion.png' /> Đi làm ngay
                </span>
              )}
            </div>
            <div className='item-information_city'>
              {address?.city_name && (
                <>
                  <div className='city-icon'>
                    <img src='./assets/address.png' />
                  </div>
                  <div className='city-text'>
                    {' '}
                    {address?.district_name && address?.district_name + ','}
                    {address?.city_name}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='item-right'>
          <Link to={`/portfolios/${id}`} className='candidate-profile_btn item-right_text'>
            Xem hồ sơ
          </Link>
        </div>
      </div>
    </div>
  )
}
