import http from '../utils/http'

export  const usersAdd = async (data) => {
  try {
    let {result } = await http({ 
      url:'/api/users/',
      data,
      type:'post' 
    })
    return result;
  } catch (err) {
    console.log(err);
  }
}



