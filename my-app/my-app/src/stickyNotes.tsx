import React, { useState, useEffect, useContext } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { LikeButton } from './toggles';
import { themes, ThemeContext } from "./themeContext";

export const StickyNotes = () => {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
  const handleToggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]);
  const onToggleLike = (note:Note)=>{
    if(note.liked){
        setFavoriteTitles(prevFavorites => [...prevFavorites, note.title]);
    }else{
        setFavoriteTitles(prevFavorites=>prevFavorites.filter((title) => title !== note.title));
    }
  }

  const [notes, setNotes] = useState(dummyNotesList);
  const createNoteHandler = (event: React.FormEvent)=>{
    event.preventDefault();
    const titleStr = (document.getElementById("titleID") as HTMLInputElement).value;
    const contentStr = (document.getElementById("contentID") as HTMLInputElement).value;
    const labelStr = (document.getElementById("labelID") as HTMLSelectElement ).value;
    const label = labelStr as Label;
    setNotes([{ id: notes.length + 1, title: titleStr, content: contentStr, label: label, liked:false }, ...notes]);
  }

  const closeNoteHandler = (note:Note)=>{
    setFavoriteTitles(favoriteTitles.filter(t=>t!=note.title));
    setNotes(notes.filter(noteIt => noteIt!== note));
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container'
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground
        }}
      >

        <form className="note-form">
          <div><input id = 'titleID' placeholder="Note Title"></input></div>
          <div><textarea id = 'contentID' placeholder="Note Content"></textarea></div>
          <div>
            <select id="labelID">
              {Object.values(Label).map((label, index) => (
                  <option key={index} value={label}>
                      {label}
                  </option>
              ))}
            </select>
          </div>
          <div><button style={{
                color: currentTheme.foreground
              }}
               type="submit" onClick={createNoteHandler}>Create Note</button></div>
        </form>

        <div className="notes-grid" >
          {notes.map((note) => (
            <div 
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground
              }}
              key={note.id}
              className="note-item">
              <div className="notes-header">
                <LikeButton note={note} onToggleLike={() => onToggleLike(note)}/>
                <button data-testid={"xbut"+note.id} onClick={()=>closeNoteHandler(note)}>x</button>
              </div>
              
              <div contentEditable="true"><h2> {note.title} </h2></div>
              <div contentEditable="true"><p> {note.content} </p></div>
              <div contentEditable="true"><p> {note.label} </p></div>
            </div>
          ))}
        </div>

        <div className="note-form">
          <button onClick={handleToggleTheme}> Toggle Theme </button>
          <h2>Favorite Notes</h2>
          <ul>
            {favoriteTitles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>

        

      </div>
    </ThemeContext.Provider>
  );
}