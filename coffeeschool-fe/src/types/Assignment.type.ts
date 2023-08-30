export type AssignmentItemType = {
  uuid: string | undefined
  title: string
  description: string
  min_score: number
  max_score: number
  maxScores: number
  coefficient: number
  positive: boolean
}

export type AssignmentType = {
  uuid: string
  course_code: string
  boards: []
}

export type AssignmentBoardType = {
  uuid?: string
  labelName: string
  max_scores: number
  scores_to_pass: number
  children: AssignmentBoardChildrenType[]
}

export type AssignmentBoardChildrenType = {
  category: string
  children: {
    category: string
    children: {
      category: string
      children: AssignmentItemType[]
    }[]
  }[]
}
