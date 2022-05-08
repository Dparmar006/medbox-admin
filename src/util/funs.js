export const displayDate = (date = new Date(), separator = '/') => {
  return `${date.getDate()} ${separator} ${date.getMonth()} ${separator} 
  ${date.getFullYear()}`
}
