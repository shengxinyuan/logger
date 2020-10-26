const state = {
  ownLoggerList: []
}

const getters = {
  
}

const mutations = {
  logger_setOwnLoggerList(state, res) {
    let list = []
    if (res && res.length) {
      res.forEach((val) => {
        try {
          list.push(JSON.parse(val.eventPoint))
        } catch (error) {
          console.log(error);
        }
        console.log('1231231', val);
      });
    } else {
      list = []
    }
    console.log(list);
    state.ownLoggerList = list
  }
}

const actions = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
