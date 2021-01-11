async function sendMessage(client, to, message) {
  let response = {}
  
  await client
  .sendText(to, message)
  .then((result) => {
    response = result
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
  return response
}

export { sendMessage }