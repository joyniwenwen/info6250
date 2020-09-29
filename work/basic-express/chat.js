const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    timestamp: new Date("2019-01-01 19:20:00"),
    text: "You up?",
  },
  {
    sender: "Bao",
    timestamp: new Date("2019-01-01 19:21:00"),
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, timestamp, text }) {
  // Fill in!
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

