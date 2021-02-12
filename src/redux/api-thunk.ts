import { get } from "../services/fetchSerice"

export const getUsername = (username: string) => async (dispatch: (t: any) => void) => {
  // dispatch({ type: LOGIN_START })
  // dispatch(requestPending())

  try {
      const result = await get(`api/bios/${username}`)

      // dispatch({
      //     type: LOGIN_SUCCESS,
      //     payload: {
      //         username,
      //         auth_token: result.auth_token
      //     },
      // })

      // dispatch(requestSuccess())

  } catch (error) {
      //TODO catch errors
      // dispatch(loginError(error.message))
      // dispatch(requestError())

      // dispatch(addAlertMessage(error))
  }
}
