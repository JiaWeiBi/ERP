import moment from 'moment'

export const dateFormatter = function(time) {
  return moment(time * 1000).format('YYYY-MM-DD HH:mm')
}

export const timezoneFormatter = function(time) {
  if (!time) {
    return null
  }
  return moment(time).format('YYYY-MM-DD HH:mm')
}
