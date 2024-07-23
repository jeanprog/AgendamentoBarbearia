import axios from 'axios'

const authUser = async (): Promise<any> => {
  try {
    const responseUser = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/user-login`
    )
    if (responseUser) {
      return responseUser.data
    }
    return []
  } catch (error) {
    console.log(error, 'erro na requisição')
    return []
  }
}

export default authUser
