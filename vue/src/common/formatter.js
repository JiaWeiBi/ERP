import moment from 'moment'

export const dateFormatter = function(time) {
  return moment(time * 1000).format('YYYY-MM-DD HH:mm')
}

export const timezoneFormatter = function(time) {
  return moment(time).format('YYYY-MM-DD HH:mm')
}
