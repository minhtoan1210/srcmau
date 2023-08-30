import Footer from 'containers/Footer'
import dayjs from 'dayjs'
import { selectUserSetting } from 'store/UserSetting/selector'
import { v4 as uuidv4 } from 'uuid'

import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { AddressType, TitleType } from 'types'

import {
  getPortfolioDetail,
  getShowFile,
  updateVerifyDownload,
  updateVerifyDownloadUser,
} from 'services/userServices'

import Page404 from '../404'
import './css/commondetail.css'
import './css/mainmenudetail.css'
import './css/resume.css'
import './css/style.css'

type DataType = {
  about?: string
  name?: string
  date: string
  avatar: string
  uuid: string
  properties: any
  email: string
  timelines: any
  address: AddressType
  data: any
  skills: any
  slug: string
  description: string
  files: any
  title: TitleType
  open_to_work: boolean
  hobbies?: any
  authorized: {
    download: boolean
  }
}

function myGreeting() {
  const percent = document.querySelectorAll('.percent-sub')
  percent.forEach(element => {
    element?.classList.add('mystyle')
  })
}

export default function PortfoliosPage(): JSX.Element {
  const [user, setUser] = useState<DataType>()
  const [timeliness, setTimelines] = useState<string[]>([])
  const [instagram, setInstagram] = useState()
  const [facebook, setFacebook] = useState()
  const [twitter, setTwitter] = useState()
  const [phone, setPhone] = useState()
  const [birthDate, setBirthDate] = useState()
  const [loading, setLoading] = useState<boolean>(true)

  const { id } = useParams()

  const { data, isError } = useQuery(['getPortfolioDetail', id], () => {
    if (id) {
      return getPortfolioDetail(id)
    }
  })

  const { items } = useSelector(selectUserSetting)
  const innerMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerMenuRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (data) {
      setUser(data.data)
      setLoading(false)
    }

    setTimeout(myGreeting, 2000)
  }, [data])

  useEffect(() => {
    if (user) {
      if (id === user?.uuid) {
        user?.properties?.forEach((value: any) => {
          if (value?.name === 'Birthdate') {
            setBirthDate(value?.value)
          }

          if (value?.name === 'Mobile') {
            setPhone(value?.value)
          }

          if (value?.name === 'Instagram') {
            setInstagram(value?.value)
          }

          if (value?.name === 'Facebook') {
            setFacebook(value?.value)
          }

          if (value?.name === 'Twitter') {
            setTwitter(value?.value)
          }
        })

        const timelinesList: string[] = user?.timelines.map((value: any) => {
          return value.event.name
        })
        setTimelines([...new Set(timelinesList)])
      }
    }
  }, [user])

  const onHamburgerClickHandler = () => {
    hamburgerMenuRef.current?.classList.toggle('is-active')
    innerMenuRef.current?.classList.toggle('is-active')
  }

  const updateVerifyDownloadMutation = useMutation(updateVerifyDownload, {
    onSuccess: (data: { data: { status: boolean } }) => {
      if (data?.data?.status === true) {
        handlePrint1()
      }
    },
  })

  const UserId = useMutation(updateVerifyDownloadUser, {
    onSuccess: (data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      window.open(url)
    },
  })

  const showFile = useMutation(getShowFile, {
    onSuccess: (data: any) => {
      const blob = new Blob([data?.data], { type: data?.data.type })
      const url = URL.createObjectURL(blob)
      window.open(url)
    },
  })

  const showFileHandler = (uuid: string) => {
    showFile.mutate(uuid ? uuid : '')
  }

  const handlePrint1 = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: user?.name,
  })

  const handlePrint = () => {
    updateVerifyDownloadMutation.mutate(user?.uuid)
  }

  const getPageMargins = () => {
    return `@page { margin: 20px 0px 20px 20px !important; size: A4; }`
  }

  ;<style>{getPageMargins()}</style>

  if (isError) {
    return <Page404 />
  }

  return (
    <>
      {loading ? (
        <div className='loader'>
          <div className='inner one'></div>
          <div className='inner two'></div>
          <div className='inner three'></div>
        </div>
      ) : (
        <>
          <main className='main-content sticky-parent detail-portfolios'>
            <aside className='section aside detailportfolios'>
              <div className='bg-aside sticky-column'>
                <div className='contact contact-detail'>
                  <div className='contact__image'>
                    <img src={user?.avatar} alt='' />
                  </div>
                  <div className='contact__name'>
                    <h2>{user?.name || '--'}</h2>
                  </div>
                  <div className='contact__job-tile'>{user?.title ? user.title.name : 'N/A'}</div>
                  <div className='contact__socials'>
                    {instagram && (
                      <a href={instagram} target='_blank'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                          <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
                        </svg>
                      </a>
                    )}
                    {facebook && (
                      <a href={facebook} target='_blank'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                          <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
                        </svg>
                      </a>
                    )}
                    {twitter && (
                      <a href={twitter} target='_blank'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                          <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className='contact__info'>
                    {items?.map(
                      (value: any) =>
                        value.key === 'show_property_birthdate' &&
                        value.value === '1' && (
                          <div className='contact__item' key={uuidv4()}>
                            <img className='icon' src='/assets/calendar.svg' />
                            {birthDate
                              ? dayjs(birthDate).format('DD/MM/YYYY')
                              : 'Purchase to view this property'}
                          </div>
                        )
                    )}

                    <div className='contact__item address'>
                      <img className='icon' src='/assets/map.svg' />
                      {user?.address?.district_name
                        ? user?.address?.district_name + ',' + user?.address?.city_name
                        : 'Purchase to view this property'}{' '}
                    </div>
                    {/* <div className='contact__item'>
                      <img className='icon' src='/assets/mail.svg' alt='Mail' />
                      <a className='contact__item_email' href={`mailto:${user?.email}`}>
                        {' '}
                        {user?.email}
                      </a>
                    </div> */}
                    {/* <div className='contact__item'>
                      <img className='icon' src='/assets/phone.svg' alt='Số điện thoại' />
                      {phone ? phone : 'Purchase to view this property'}
                    </div> */}
                    <div className='contact__item favorite'>
                      {user?.hobbies
                        ? user?.hobbies?.map((value: any) => (
                            <div key={uuidv4()} className='item-favorite'>
                              <img
                                className='item-favorite_img'
                                src={`/assets/${value.icon.file_name}`}
                                alt=''
                              />
                              {value?.name}
                            </div>
                          ))
                        : null}
                    </div>
                    {user?.authorized.download ? (
                      <div
                        className='contact__item button'
                        onClick={handlePrint}
                        style={{ cursor: 'pointer' }}>
                        <i className='fa-solid fa-arrow-down'></i> <span>Download CV</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </aside>
            <section className='section content resume'>
              <header>
                <div id='menu'>
                  <div className='circle-menu'>
                    <div
                      className='hamburger'
                      ref={hamburgerMenuRef}
                      onClick={onHamburgerClickHandler}>
                      <div className='line' />
                      <div className='line' />
                      <div className='line' />
                    </div>
                  </div>
                  <div className='inner-menu js-menu' ref={innerMenuRef}>
                    <ul id='menu-main-menu' className='nav'>
                      <li className='menu-item-has-children nav__item'>
                        <Link to='/'>
                          <span className='animated-button'>
                            <span>Home</span>
                          </span>
                        </Link>
                      </li>
                      <li className='menu-item-has-children nav__item'>
                        <a href='https://baristaschool.vn/' target='_blank'>
                          <span className='animated-button'>
                            <span>Barista School</span>
                          </span>
                        </a>
                      </li>
                      <li className='menu-item-has-children nav__item'>
                        <a href='https://moodle.coffeeschool.vn/' target='_blank'>
                          <span className='animated-button'>
                            <span>Coffeeschool</span>
                          </span>
                        </a>
                      </li>
                      <li className='menu-item-has-children nav__item'>
                        <a href='/management/edit-account-info/my-account' target='_blank'>
                          <span className='animated-button'>
                            <span>My account</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </header>
              <section className='section-content'>
                <h2 className='main-title work'>Định hướng công việc</h2>
                <div className='row'>
                  <div className='col-12'>
                    <div className='timeline-about'>{user?.about}</div>
                  </div>
                </div>
              </section>
              <section className='section-content section-bg'>
                <h2 className='main-title curriculumvitae'>Sơ yếu lý lịch</h2>
                <div className='main-title_curriculumvitae'>
                  <div className='main-title_curriculumvitae-left'>
                    {user?.timelines &&
                      timeliness.map((ele: any, idx: number) => (
                        <div key={uuidv4()}>
                          {idx % 2 === 0 && (
                            <>
                              <h3 key={idx} className='main-title_curriculumvitae-left_tile'>
                                {ele}
                              </h3>
                              {user?.timelines.map(
                                (value: any, index: number) =>
                                  value.event.name == ele && (
                                    <div className='timeline curriculum' key={uuidv4()}>
                                      <div className='timeline__item'>
                                        <h4 className='item__job-place'>{value.data.place}</h4>
                                        <h4 className='item__job-title'>{value.data.title}</h4>
                                        <h4 className='item__job-timdate'>
                                          {value?.from
                                            ? dayjs(value.from).format('DD/MM/YYYY') +
                                              ' ' +
                                              '-' +
                                              ' '
                                            : ''}
                                          {value?.to
                                            ? dayjs(value.to).format('DD/MM/YYYY')
                                            : 'Hiện tại'}
                                        </h4>
                                        <h5 className='item__job-description'>
                                          {value?.data?.description}
                                        </h5>
                                      </div>
                                    </div>
                                  )
                              )}
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className='main-title_curriculumvitae-right'>
                    {user?.timelines &&
                      timeliness.map((ele: any, idx: number) => (
                        <div key={uuidv4()}>
                          {idx % 2 !== 0 ? (
                            <>
                              <h3 key={idx} className='main-title_curriculumvitae-right_tile'>
                                {ele}
                              </h3>
                              {user?.timelines.map((value: any, index: number) =>
                                value.event.name == ele ? (
                                  <div className='timeline curriculum' key={uuidv4()}>
                                    <div className='timeline__item'>
                                      <h4 className='item__job-place'>{value.data.place}</h4>
                                      <h4 className='item__job-title'>{value.data.title}</h4>
                                      <h4 className='item__job-timdate'>
                                        {value?.from
                                          ? dayjs(value.from).format('DD/MM/YYYY') + ' ' + '-' + ' '
                                          : ''}
                                        {value?.to
                                          ? dayjs(value.to).format('DD/MM/YYYY')
                                          : 'Hiện tại'}
                                      </h4>
                                      <h5 className='item__job-description'>
                                        {value?.data?.description}
                                      </h5>
                                    </div>
                                  </div>
                                ) : (
                                  ''
                                )
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                <div className='content-item'></div>
              </section>
              {user?.files && user?.files.length > 0 && (
                <section className='section-content section-bg licensed'>
                  <div className='row'>
                    <div className='col-6 certificate'>
                      <h3 className='title-reference'>Chứng chỉ tham chiếu</h3>
                      {user?.files.map((value: any) => (
                        <div className='certificate-container' key={uuidv4()}>
                          <h5
                            className='certificate-name'
                            onClick={() => showFileHandler(value.uuid)}>
                            {value?.title ? value?.title : value?.filename}
                          </h5>
                        </div>
                      ))}
                    </div>
                    <div className='col-6 achievements'></div>
                  </div>
                </section>
              )}

              <section className='section-content section-white licensed'>
                <div className='row'>
                  <div className='col-12'>
                    {user?.skills && user.skills.length > 0 && (
                      <>
                        <h3 className='item-content_title-skill'>Kỹ Năng Mềm</h3>
                        <div className='container-skill'>
                          {user?.skills.map((value: any) => (
                            <div key={uuidv4()}>
                              {/* <img className='icon' src='/assets/softskill.svg' /> */}
                              <div className='timeline-percent'>
                                <div
                                  className='timeline-percent_timeline'
                                  style={{ width: `${value?.value}%` }}>
                                  <div className='timeline-percent_right'>{value?.value}%</div>
                                  <div className='percent-sub' />
                                </div>
                                <div className='timeline-percent_left'>{value?.name}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>
              <Footer />
            </section>
          </main>

          {/* Start PDF */}
          <div className='page-pdf' style={{ overflow: 'hidden', height: 0 }}>
            <div className='pdf' ref={componentRef}>
              <header>
                <div className='container'>
                  <div className='header'>
                    <div className='header-left'>
                      <div className='header-left_title'></div>
                      <div className='header-left_img'>
                        <img className='header-img' src={user?.avatar} />
                      </div>
                    </div>
                    <div className='header-right'>
                      <div className='header-right_title'>
                        <span className='right-title'>{user?.name}</span>
                      </div>
                      {items?.map(
                        (value: any) =>
                          value.key === 'show_property_birthdate' &&
                          value.value === '1' && (
                            <div className='contact__item' key={uuidv4()}>
                              <img className='icon' src='/assets/calendar.svg' />
                              {birthDate
                                ? dayjs(birthDate).format('DD - MM - YYYY')
                                : 'Purchase to view this property'}
                            </div>
                          )
                      )}
                      <div className='header-right_addres'>
                        {user?.address && (
                          <>
                            <img className='header-addres_img' src='/assets/map.svg' />
                            <span className='header-addres_text'>
                              {user.address.street +
                                ',' +
                                user.address.ward_name +
                                ',' +
                                user.address.district_name +
                                ',' +
                                user.address.city_name}
                            </span>
                          </>
                        )}
                      </div>
                      <div className='header-right_gmail'>
                        {user?.email && (
                          <>
                            <img className='header-gmail_img' src='/assets/mail.svg' />
                            <span className='header-gmail_text'>
                              {'Email:' + ' ' + user?.email}
                            </span>
                          </>
                        )}
                      </div>
                      <div className='header-right_phone'>
                        {phone && (
                          <>
                            <img className='header-phone_img' src='/assets/phone.svg' />
                            <span className='header-phone_text'>{'Phone:' + ' ' + phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <main>
                <div className='container'>
                  {user?.about && (
                    <div className='summary'>
                      <div className='summary-left'>
                        <div className='summary-left_title'>ĐỊNH HƯỚNG CÔNG VIỆC</div>
                      </div>
                      <div className='summary-right'>
                        <span className='summary-right_content'>{user?.about}</span>
                      </div>
                    </div>
                  )}

                  <div className='experienceItem'>
                    {user?.timelines && (
                      <>
                        {timeliness.map((ele: any) => (
                          <div key={uuidv4()}>
                            <div className='experience'>
                              <div className='experience-left'>
                                <div className='experience-left_title'>{ele}</div>
                              </div>

                              <div className='experience-right'>
                                {user?.timelines.map((value: any) =>
                                  value.event.name == ele ? (
                                    <div className='experience-right_item' key={uuidv4()}>
                                      <div className='experience-header_title'>
                                        <span className='experience-right_place'>
                                          {value.data.place}
                                        </span>
                                        <span className='experience-right_title'>
                                          {value.data.title}
                                        </span>
                                      </div>
                                      <div className='experience-header_top'>
                                        <span className='experience-right_time'>
                                          {value?.data.description
                                            ? value.from
                                              ? value?.from + ' ' + '-' + ' '
                                              : ''
                                            : ' '}
                                          {value?.data.description
                                            ? value?.to
                                              ? value?.to
                                              : 'Hiện tại'
                                            : ' '}
                                        </span>
                                      </div>
                                      {value?.data.description && (
                                        <div className='experience-right_content'>
                                          {value.data.description}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    ''
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {user?.files && user?.files.length > 0 && (
                    <div className='education'>
                      <div className='education-left'>Chứng chỉ tham chiếu</div>
                      <div className='education-right'>
                        {user?.files.map((value: any) => (
                          <div className='certificate-container' key={uuidv4()}>
                            <h5 className='certificate-name-pdf'>
                              {value?.title ? value?.title : value?.filename}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {user?.skills && user.skills.length > 0 && (
                    <div className='skills'>
                      <>
                        <div className='skills-left'>Kỹ Năng Mềm</div>
                        <div className='skills-right'>
                          <div className='container-skill'>
                            {user?.skills.map((value: any) => (
                              <div key={uuidv4()} className='timeline-percent_left-pdf'>
                                {value?.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
          {/* End PDF */}
        </>
      )}
    </>
  )
}
