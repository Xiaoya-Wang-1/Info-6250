const users = {
  Amit: { avatar: 'images/avatar-amit.jpg' },
  Bao: { avatar: 'images/avatar-bao.jpg' },
  Amy: {}
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
    date: new Date('2025-01-31T22:00:00')
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    date: new Date('2025-01-31T22:05:00')
  },
  {
    sender: 'Amy',
    text: "Hello everyone! I do not have a special avatar. I'm so sad.",
    date: new Date('2025-01-31T22:05:04')
  }
];

function addMessage({ sender, text }) {
  if(!sender || !text) {
    return;
  }
  messages.push({
    sender,
    text,
    date: new Date()
  });
}


const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;