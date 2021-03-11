import http from '../utils/http'

export  const positionsAdd = async (data) => {
  try {
    let {result } = await http({ 
      url:'/api/positions/add',
      data,
      type:'post' 
    })
    return result;
  } catch (err) {
    console.log(err);
  }
}

export  const positionsList = async () => {
  try {
    let {result } = await http({ 
      url:'/api/positions/list',
    })
    return result;
  } catch (err) {
    console.log(err);
  }
}

