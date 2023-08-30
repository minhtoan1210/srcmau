export function searchParamsToObject(
  searchParams: URLSearchParams
): Record<string, string | string[]> {
  const obj: Record<string, string | string[]> = {}

  searchParams.forEach((value, key) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key] = [...obj[key], value]
      } else {
        obj[key] = [value, obj[key] as string]
      }
    } else {
      obj[key] = value
    }
  })

  return obj
}
