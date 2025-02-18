export default function Chat({ contact, onTextChange }: {contact: any, onTextChange: any}) {
  const text = contact.message;
  const sendMessage =(msg: string) => {
    if(msg){
      alert(msg);
    }
  };
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => onTextChange(e.target.value, contact.email)}
      />
      <br />
      <button disabled={text.length < 3} onClick={() => sendMessage(text)}>Send to {contact.email}</button>
    </section>
  );
}
