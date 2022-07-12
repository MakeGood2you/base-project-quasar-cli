import { Loading } from 'quasar'

export function showLoading(context) {
  return Loading.show({
    spinnerColor: 'green',
    spinnerSize: 140,
    // message: 'Some important process is in progress. Hang on...',
    // messageColor: 'black'
  })
}

export function hideLoading(context) {
  return Loading.hide()
}
