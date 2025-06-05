export function createModel() {
    return {
      loggedIn: false,
  
      username: '',

      currentChannel: 'general',

      channels: [],

      messages: [],
  
      users: [],
  
      errorMessage: '',
  
      loading: false,
  
      lastMessageId: 0,
    };
  }
  