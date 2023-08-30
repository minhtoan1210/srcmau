import { selectUserProfile } from 'store/UserSlice/selector'
import { v4 as uuidv4 } from 'uuid'

import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import { getPackages, getPackagesNew, getSettingGroupHome } from 'services/packageServices'

import PaymentModalHome from './components/PaymentModalHome'
import './style.css'
import { Button } from 'antd'

function SampleNextArrow(props: any) {
  const { onClick } = props
  return (
    <div className='next' onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        className='ai ai-ChevronRight'>
        <path d='M8 4l8 8-8 8' />
      </svg>
    </div>
  )
}

function SamplePrevArrow(props: any) {
  const { onClick } = props
  return (
    <div className='pre' onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        className='ai ai-ChevronLeft'>
        <path d='M15 4l-8 8 8 8' />
      </svg>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { uuid } = useSelector(selectUserProfile)

  // const { data: listPackages } = useQuery(['getPackagesNew'],getPackagesNew)
  // const { data: listPackagess } = useQuery(['getPackages'],getPackages)
  const { data: listSettingGroupHome } = useQuery(['getSettingGroupHome'], getSettingGroupHome)

  const [dataPackages, setDataPackages] = useState<any>()
  const [dataSettingGroupHome1, setDataSettingGroupHome1] = useState<any>()
  const [dataSettingGroupHome2, setDataSettingGroupHome2] = useState<any>()

  const [isLoading, setIsLoading] = useState<any>()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idModalPackage, setIdModalPackage] = useState<string>()

  // useEffect(() => {
  //   if (listPackages) {
  //     setDataPackages(listPackages.data)
  //   }
  // }, [listPackages])

  useEffect(() => {
    if (listSettingGroupHome) {
      setDataSettingGroupHome1(JSON.parse(listSettingGroupHome?.data[0].properties[`value`]))
      setDataSettingGroupHome2(JSON.parse(listSettingGroupHome?.data[1].properties[`value`]))
    }
  }, [listSettingGroupHome])

  const innerMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerMenuRef = useRef<HTMLDivElement>(null)

  const onHamburgerClickHandler = () => {
    hamburgerMenuRef.current?.classList.toggle('is-active')
    innerMenuRef.current?.classList.toggle('is-active')
  }

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesToScroll: 3,
    dots: true,
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  const showModal = (value: string): void => {
    setIdModalPackage(value)
    setIsModalOpen(true)
  }

  const handleOk = (): void => {
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  return (
    <div className='home'>
      <h2 className='home-title_application main-title curriculumvitae'>GÓC TUYỂN DỤNG</h2>
      <header>
        <div id='menu'>
          <div className='circle-menu'>
            <div className='hamburger' ref={hamburgerMenuRef} onClick={onHamburgerClickHandler}>
              <div className='line' />
              <div className='line' />
              <div className='line' />
            </div>
          </div>
          <div className='inner-menu js-menu' ref={innerMenuRef}>
            <ul id='menu-main-menu' className='nav'>
              <li className='menu-item-has-children nav__item'>
                <Link to='/management/login'>
                  <span className='animated-button'>
                    <span>Log In</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className='home-application'>
        <div className='home-application_slider'>
          <Slider {...settings}>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
            <div className='item-slider'>
              <div className='item-slider_img'>
                <img src='/assets/avarta.png' alt='' />
              </div>
              <div className='item-slider_text'>Hồ sơ thợ rang</div>
              <div className='item-slider_btn'>
                <Link to='/portfolios'>Xem hồ sơ</Link>
              </div>
            </div>
          </Slider>
        </div>
        <div className='home-application_request'>
          {listSettingGroupHome && (
            <>
              <div className='request-title'>{dataSettingGroupHome1?.title}</div>
              <div className='request-text'>{dataSettingGroupHome1?.content}</div>
              <div className='request-btn'>
                <a href={dataSettingGroupHome1?.link}>{dataSettingGroupHome1?.link_text}</a>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='home-file'>
        <h2 className='home-title_file main-title curriculumvitae'>GÓi XEM HỒ SƠ</h2>
        <div className='home-file_container'>
        <div className='home-file_package'>
                <div className='item-package' key={uuidv4()}>
                  <div className='item-package_title'>asdas</div>
                  <div className='price'>
                    <span className='number'>100.000</span>
                    <span className='date'>vnđ/tháng</span>
                  </div>
                  <div className='text'>
                    <span className='text-sub'> asdsad</span>
                    {/* <span className='text-sub'> - Lorem ipsum dolor sit amet</span> */}
                  </div>
                  <div className='btn-buynow'>
                    <Button onClick={() => showModal("1")} >
                      MUA NGAY
                    </Button>
                  </div>
                </div>
          </div>
          <PaymentModalHome
            isOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            idModalPackage={idModalPackage}
          />
          <div className='home-file_cv'>
            {listSettingGroupHome && (
              <>
                <div className='cv-text_title'>{dataSettingGroupHome2?.title}</div>
                <div className='cv-text_title2'>{dataSettingGroupHome2?.content}</div>
                <div className='btn-cv'>
                  <a href={dataSettingGroupHome2?.link}>{dataSettingGroupHome2?.link_text}</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
