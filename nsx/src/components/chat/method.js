
function addEmoji(emoji) {
  const { message } = this.state;
  const text = `${message}${emoji.native}`;

  this.setState({
    message: text,
  });
}

// [..]

export { addEmoji };