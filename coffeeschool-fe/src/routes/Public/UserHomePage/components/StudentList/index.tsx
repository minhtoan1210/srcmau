import Footer from 'containers/Footer'

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Pagination, Spin } from 'antd'

import { TitleType } from 'types'

import { PortfoliosQueryType } from '../..'
import ListItem from './ListItem'

type DataType = {
  name: string
  date: string
  avatar: string
  uuid: string
  properties: any
  title: TitleType
  address: any
  open_to_work: boolean
}

interface Props {
  queryParams?: PortfoliosQueryType
  setQueryParams: React.Dispatch<React.SetStateAction<PortfoliosQueryType | undefined>>
  categoriesData: any
  isLoadingCategories?: boolean
}

export default function StudentList({
  queryParams,
  setQueryParams,
  categoriesData,
  isLoadingCategories,
}: Props): JSX.Element {
  const innerMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerMenuRef = useRef<HTMLDivElement>(null)

  const changPage = (page: number, pageSize: number) => {
    window.scrollTo(0, 0)

    setQueryParams({
      ...queryParams,
      page: page,
      per_page: pageSize,
    })
  }

  const onHamburgerClickHandler = (): void => {
    hamburgerMenuRef.current?.classList.toggle('is-active')
    innerMenuRef.current?.classList.toggle('is-active')
  }

  return (
    <>
      {isLoadingCategories ? (
        <div className='loader'>
          <div className='inner one'></div>
          <div className='inner two'></div>
          <div className='inner three'></div>
        </div>
      ) : (
        <>
          <section className='section content'>
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
            <h1 className='main-title'>Danh sách ứng viên</h1>
            <div className='candidates'>
              <Spin spinning={isLoadingCategories}>
                {categoriesData?.data.items.map((value: any) => (
                  <ListItem
                    key={value.uuid}
                    open_to_work={value.open_to_work}
                    name={value.name}
                    date={value.date}
                    img={value.avatar}
                    id={value.uuid}
                    title={value.title}
                    address={value.address}
                    properties={value.properties}
                  />
                ))}
              </Spin>
            </div>
            <div className='pagination'>
              <Pagination
                defaultCurrent={5}
                total={categoriesData?.data.total || 0}
                current={queryParams?.page || 1}
                pageSize={queryParams?.per_page || 5}
                onChange={changPage}
                showSizeChanger={false}
                itemRender={(page, type) => {
                  if (type === 'next') {
                    return (
                      <a>
                        <img src='./assets/next.png' alt='' />
                      </a>
                    )
                  } else if (type === 'prev') {
                    return (
                      <a>
                        <img src='./assets/prev.png' alt='' />
                      </a>
                    )
                  }

                  if (type === 'page') {
                    return <a>{page}</a>
                  }

                  if (type === 'jump-prev') {
                    return <span>...</span>
                  }

                  if (type === 'jump-next') {
                    return <span>...</span>
                  }
                }}
              />
            </div>
            <Footer />
          </section>
        </>
      )}
    </>
  )
}
