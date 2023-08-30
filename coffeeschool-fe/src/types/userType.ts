export type PropertiesType = {
  uuid?: string
  name: string
  slug: string
  type: 'email' | 'phone' | 'date' | 'district' | 'position' | 'mobile' | 'checkBox'
  value: string
  category_uuid?: string
  category: CategoryType
  description: string | null
  paid_required: boolean
}

export type CategoryType = {
  uuid?: string
  name: string
  slug: string
  entity: string
}

export type SkillType = {
  uuid?: string
  name: string
  icon: string
  value: string
  description: string | null
}

export type OptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type EventType = {
  uuid?: string
  name: string
  slug: string
  description: string | null
}

export type PermissionType = {
  uuid: string
  name: string
  authorizations: {
    [key: string]: boolean
  }
}

export type RoleType = {
  uuid: string
  name: string
  authorizations: {
    [key: string]: boolean
  }
  permisstions?: string[]
  value?: boolean
}

export type HobbyType = {
  uuid?: string
  name: string
  value?: number
  icon: IconType
  description: string
  icon_uuid?: string
}

export type AddressType = {
  street: string
  city_uuid: string
  city_name: string
  district_uuid: string
  district_name: string
  ward_uuid: string
  ward_name: string
}

export type TimeLinesType = {
  from: string
  to: string
  data: TimeLineValueType
  event: EventType
}

export type TimeLineValueType = {
  title: string
  description: string
  place: string
}

export type QueryParamsType = {
  page: number
  per_page: number
  orderBy?: string | string[]
  orderDirection?: 'desc' | 'asc'
  search?: string
  'searchIn[]'?: string[]
  [key: string]: any
}

export type FileCollectionTableType = {
  uuid: string
  name: string
  slug: string
}

export type PackageType = {
  uuid: string
  name: string
  description: string
  downloads: number
}

export type FileType = {
  uuid: string
  filename: string
  title: string
  collection: FileCollectionTableType
  publish: boolean
  mime: string
  user: {
    uuid: string
    name: string
  }
}

export type IconType = {
  uuid: string
  file_name: string
}

export type TitleType = {
  uuid: string
  name: string
  slug: string
  is_published: boolean
  authorizations: TitleAuthType
}

export type TitleAuthType = {
  view: boolean
  delete: boolean
  viewAny: boolean
  update: boolean
}

export type UserEventsType = {
  category: string
  event: string
  payload: any
}
