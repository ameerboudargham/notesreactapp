import { useState } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import AddNoteForm from './components/AddNoteForm';

function App() {
  
  const [notes, setNotes] = useState([
    {
      id: 1,
      category: 'home',
      content: 'Buy groceries',
      priority: 3,
      author: {
        userName: 'ameer',
        profile: 'avatar4.jpg',
      },
    },
    {
      id: 2,
      category: 'hobbies',
      content: 'Note 2',
      priority: 5,
      author: {
        userName: 'amin',
        profile: 'avatar5.png',
      },
    },
  ]);

  const [noteBeingEdited, setNoteBeingEdited] = useState(null);
  const [addingNote, setAddingNote] = useState(false);
  const [formData, setFormData] = useState({
    // @ts-ignore
    content: noteBeingEdited?.content || '',priority: noteBeingEdited?.priority || 1,category: noteBeingEdited?.category || '',
  });

  function addNote(note: any) {
    console.log(note)
    const newNoteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  
    // Create a new note with the generated ID
    const newNote = { ...note, id: newNoteId };
  
    // Update the state with the new note
    setNotes((prevNotes) => [...prevNotes, newNote]);
  
    // Reset the form and noteBeingEdited
    setFormData({
      content: '',
      priority: 1,
      category: '',
    });
  
    setAddingNote(false);
    setNoteBeingEdited(null);
  }


  function editNote(noteID: number) {
    let noteToEdit = notes.find((note) => note.id === noteID);
    if (noteToEdit) {
      // @ts-ignore
      setNoteBeingEdited(noteToEdit);
      setNotes(notes.filter((note) => note.id !== noteID));
      setAddingNote(true);
    }
  }

  function deleteNote(noteID: number) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteID));
  }

  return (
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList deleteNote={deleteNote} editNote={editNote} notes={notes} />
      {/* @ts-ignore */}
      <AddNoteForm addNote={addNote} formData={formData} setFormData ={setFormData} noteBeingEdited={noteBeingEdited} addingNote={addingNote} />
    </div>
  );
}

export default App;