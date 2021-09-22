import React, { useState } from "react";

function CreateArea({onAdd}) {
  const [note, setNote] = useState({
      title: "",
      content: ""
    })

  const handleOnChange = (event) => {
    const {value, name} = event.target

    setNote(preValue => {
      if (name === 'title'){
        return {
          ...preValue,
          title: value
        }
      }else{
        return {
          ...preValue,
          content: value
        }
      }
    })
  }

  return (
    <div>
      <form>
        <input onChange={handleOnChange} value={note.title} name="title" placeholder="Title" />
        <textarea onChange={handleOnChange} value={note.content} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={(event) => {
          event.preventDefault()
          onAdd(note)
          setNote({
            title: "",
            content: ""
          })
        }}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
