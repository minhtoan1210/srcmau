import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Col, Row, Space, Tooltip } from 'antd'

import { map } from 'lodash'

import { AddressType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { getUserDetail } from 'services/authServices'
import { getEvents } from 'services/eventsServices'
import { getHobbies } from 'services/hobbiesServices'
import { getSkills } from 'services/skillsServices'
import {
  getProperties,
  updateUserAddress,
  updateUserHobbies,
  updateUserInfo,
  updateUserProperties,
  updateUserSkills,
  updateUserTimelines,
} from 'services/userServices'

import Address from '../components/Address'
import Hobbies from '../components/Hobbies'
import Profile from '../components/Profile'
import Skills from '../components/Skills'
import Timelines from '../components/Timelines'
import UserInfo from '../components/UserInfo'
import { ProfileFormType } from '../types'

interface Props {
  id?: string
}

export default function MyProFile({ id }: Props): JSX.Element {
  const navigate = useNavigate()

  const { data: userData, isLoading } = useQuery(['getUserDetail', id], () => getUserDetail(id))
  const { data: skillsData, isLoading: isLoadingSkills } = useQuery(['getSkills'], () =>
    getSkills({ 'where[is_published]': 1 })
  )
  const { data: hobbiesData, isLoading: isLoadingHobbies } = useQuery(['getHobbies'], () =>
    getHobbies({ 'where[is_published]': 1 })
  )
  const { data: eventsData, isLoading: isLoadingEvents } = useQuery(['getEvent'], () =>
    getEvents({ 'where[is_published]': 1 })
  )
  const { data: propertiesData, isLoading: isLoadingProperties } = useQuery(['getProperties'], () =>
    getProperties({ 'where[is_published]': 1, 'whereHas[category][is_published]': 1 })
  )

  const updateUserPropertiesMutation = useMutation(updateUserProperties, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const updateUserSkillsMutation = useMutation(updateUserSkills, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const updateUserHobbiesMutation = useMutation(updateUserHobbies, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const updateUserAddressMutation = useMutation(updateUserAddress, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const updateUserInfoMutation = useMutation(updateUserInfo, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const updateUserTimelinesMutation = useMutation(updateUserTimelines, {
    onSuccess: () => {
      toast.success('Updated!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onUpdateProfileHandler = (form: ProfileFormType): void => {
    const dataToSubmit = {
      properties: map(form, (value, key) => {
        return {
          property_uuid: key,
          value,
        }
      }),
    }

    if (id) {
      return updateUserPropertiesMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserPropertiesMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  const onUpdateSkillsHandler = (form: ProfileFormType): void => {
    const dataToSubmit = {
      skills: map(form, (value, key) => {
        return {
          skill_uuid: key,
          value,
        }
      }),
    }

    if (id) {
      return updateUserSkillsMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserSkillsMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  const onUpdateHobbiesHandler = (data: string[]): void => {
    const dataToSubmit = {
      hobbies: data.map(x => ({ hobby_uuid: x })),
    }

    if (id) {
      return updateUserHobbiesMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserHobbiesMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  const onUpdateAddressHandler = (dataToSubmit: AddressType): void => {
    if (id) {
      return updateUserAddressMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserAddressMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  const onUpdateTimelinesHandler = (form: ProfileFormType[]): void => {
    const dataToSubmit = {
      timelines: form,
    }

    if (id) {
      return updateUserTimelinesMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserTimelinesMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  const onUpdateUserInfoHandler = (dataToSubmit: {
    title_uuid: string | null
    about: string
    name: string
  }): void => {
    if (id) {
      return updateUserInfoMutation.mutate({ dataToSubmit, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    updateUserInfoMutation.mutate({ dataToSubmit, id: user_uuid })
  }

  return (
    <Card
      loading={isLoading || isLoadingProperties || isLoadingSkills}
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          {id ? <>&nbsp; User Profile</> : 'My Profile'}
        </>
      }>
      <UserInfo
        title={userData?.data.title}
        about={userData?.data.about}
        openToWork={userData?.data.open_to_work}
        name={userData?.data.name}
        updateUserInfo={onUpdateUserInfoHandler}
        isLoading={updateUserInfoMutation.isLoading}
      />

      <Profile
        onUpdateProfile={onUpdateProfileHandler}
        data={userData?.data.properties}
        propertiesData={propertiesData?.data.items}
        isLoading={updateUserPropertiesMutation.isLoading}
      />

      <Address
        updateAddress={onUpdateAddressHandler}
        loading={false}
        data={userData?.data.address}
        isLoading={updateUserAddressMutation.isLoading}
      />

      <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col span={12}>
          <Skills
            loading={isLoadingSkills}
            onUpdateSkills={onUpdateSkillsHandler}
            data={userData?.data.skills}
            skillsData={skillsData?.data.items}
            isLoading={updateUserSkillsMutation.isLoading}
          />
        </Col>
        <Col span={12}>
          <Hobbies
            loading={isLoadingHobbies}
            onUpdateHobbies={onUpdateHobbiesHandler}
            data={userData?.data.hobbies}
            hobbiesData={hobbiesData?.data.items}
            isLoading={updateUserHobbiesMutation.isLoading}
          />
        </Col>
      </Row>

      <Timelines
        isLoading={updateUserTimelinesMutation.isLoading}
        loading={isLoadingEvents}
        data={userData?.data.timelines}
        timelinesData={eventsData?.data.items}
        updateTimelines={onUpdateTimelinesHandler}
      />
    </Card>
  )
}
