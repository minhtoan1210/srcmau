import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Col, Row, Space, Tooltip } from 'antd'
import { RcFile } from 'antd/lib/upload'

import { map } from 'lodash'

import { AddressType } from 'types'

import { ArrowLeftOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { getUserDetail, updatePassword } from 'services/authServices'
import { getEvents } from 'services/eventsServices'
import { getHobbies } from 'services/hobbiesServices'
import { getSkills } from 'services/skillsServices'
// import { getRoles } from 'services/systemServices'
import {
  adminChangePassword,
  getProperties,
  updateAvatar,
  updateUserAddress,
  updateUserHobbies,
  updateUserInfo,
  updateUserProperties, // updateUserRoles,
  updateUserSkills,
  updateUserTimelines,
} from 'services/userServices'

import Address from '../components/Address'
import Avatar from '../components/Avatar'
import ChangePassword from '../components/ChangePassword'
import Hobbies from '../components/Hobbies'
import Profile from '../components/Profile'
import Skills from '../components/Skills'
import Timelines from '../components/Timelines'
import UserInfo from '../components/UserInfo'
import { FormResetPasswordType, ProfileFormType } from '../types'

interface Props {
  id?: string
}

export default function EditFull({ id }: Props): JSX.Element {
  const navigate = useNavigate()

  const {
    data: userData,
    isLoading,
    refetch: refetchUserData,
  } = useQuery(['getUserDetail', id], () => getUserDetail(id))
  const { data: skillsData, isLoading: isLoadingSkills } = useQuery(['getSkills'], getSkills)
  const { data: hobbiesData, isLoading: isLoadingHobbies } = useQuery(['getHobbies'], getHobbies)
  const { data: eventsData, isLoading: isLoadingEvents } = useQuery(['getEvent'], getEvents)
  // const { data: rolesData, isLoading: isLoadingRoles } = useQuery(['getRoles'], getRoles)
  const { data: propertiesData, isLoading: isLoadingProperties } = useQuery(
    ['getProperties'],
    getProperties
  )

  const updatePasswordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      toast.success('Created')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

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

  const adminResetPassword = useMutation(adminChangePassword, {
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

  // const updateUserRolesMutation = useMutation(updateUserRoles, {
  //   onSuccess: () => {
  //     toast.success('Updated!')
  //   },
  //   onError: () => {
  //           toast.error('There are some errors. Please contact Administrator for detail')

  //   },
  // })

  const mutationUploadFile = useMutation(updateAvatar, {
    onError: err => {
      toast.error(`Error, ${err}.`)
    },
    onSuccess: () => {
      toast.success('Upload Successfully')
      refetchUserData()
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

  const onResetPasswordHandler = (form: FormResetPasswordType): void => {
    form.uuid = userData?.data.uuid
    if (id) {
      adminResetPassword.mutate(form)
    } else {
      updatePasswordMutation.mutate(form)
    }
  }

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

  // const onUpdateRolesHandler = (form: ProfileFormType): void => {
  //   const dataToSubmit = {
  //     roles: map(form, (value, key) => {
  //       return {
  //         role_uuid: key,
  //         value,
  //       }
  //     }),
  //   }

  //   if (id) {
  //     return updateUserRolesMutation.mutate({ dataToSubmit, id })
  //   }

  //   const user_uuid: string | null = localStorage.getItem('user_uuid')

  //   updateUserRolesMutation.mutate({ dataToSubmit, id: user_uuid })
  // }

  const onUploadAvatarHandler = (file: RcFile): void => {
    const formData = new FormData()
    formData.append('file', file)

    if (id) {
      return mutationUploadFile.mutate({ formData, id })
    }

    const user_uuid: string | null = localStorage.getItem('user_uuid')

    mutationUploadFile.mutate({ formData, id: user_uuid })
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
                onClick={() => {
                  if (id) {
                    navigate('/management/users-management')
                  } else {
                    navigate(-1)
                  }
                }}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          {id ? <>&nbsp; Edit user</> : 'My Account'}
        </>
      }
      extra={
        <>
          {id && (
            <ConfirmDelete
              title='Delete'
              message={`Are you sure you want to delete user`}
              useTitle
              onClick={() => toast.success('Deleted')}
              isLoading={false}
            />
          )}
        </>
      }>
      <Avatar
        avatarUrl={userData?.data.avatar}
        updateAvatarHandler={onUploadAvatarHandler}
        isLoading={mutationUploadFile.isLoading}
      />

      <ChangePassword
        onChangePasswordHandler={onResetPasswordHandler}
        isAdmin={id ? true : false}
        isLoading={updatePasswordMutation.isLoading || adminResetPassword.isLoading}
      />

      <UserInfo
        title={userData?.data.title}
        about={userData?.data.about}
        name={userData?.data.name}
        openToWork={userData?.data.open_to_work}
        updateUserInfo={onUpdateUserInfoHandler}
        isLoading={updateUserInfoMutation.isLoading}
      />

      <Address
        updateAddress={onUpdateAddressHandler}
        loading={false}
        data={userData?.data.address}
        isLoading={updateUserAddressMutation.isLoading}
      />

      <Profile
        onUpdateProfile={onUpdateProfileHandler}
        data={userData?.data.properties}
        propertiesData={propertiesData?.data.items}
        isLoading={updateUserPropertiesMutation.isLoading}
      />

      {/* <Roles
        loading={isLoadingRoles}
        onUpdateRoles={onUpdateRolesHandler}
        data={userData?.data.roles}
        rolesData={rolesData?.data.items}
      /> */}
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
        loading={isLoadingEvents}
        data={userData?.data.timelines}
        timelinesData={eventsData?.data.items}
        updateTimelines={onUpdateTimelinesHandler}
        isLoading={updateUserTimelinesMutation.isLoading}
      />
    </Card>
  )
}
