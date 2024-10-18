import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { Label } from "./types";
import userEvent from "@testing-library/user-event";
import { dummyNotesList } from "./constants";

describe("StickyNote Test", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("verify created notes", ()=>{
    render(<StickyNotes />);

    dummyNotesList.forEach(note => {
        const titleElement = screen.getByText(note.title);
        expect(titleElement).toBeInTheDocument();
    });
 });

 test("update a note", async () => {
  render(<StickyNotes />);

  const titleInput = screen.getByText("test note 1 title"); // Adjust if there's a label
  const contentInput = screen.getByText("test note 1 content"); // Adjust if there's a label

  fireEvent.input(titleInput, { target: { innerHTML: "new title" } });
  fireEvent.input(contentInput, { target: { innerHTML: "new content" } });

  const newTitle = screen.getByText("new title");
  const newContent = screen.getByText("new content");

  expect(newTitle).toBeInTheDocument();
  expect(newContent).toBeInTheDocument();
});

 test("delete a note", ()=>{
    render(<StickyNotes />);

    const titleInput = screen.getByText("test note 1 title");

    const deleteButton = screen.getByTestId("xbut1");
    
    fireEvent.click(deleteButton);

    expect(titleInput).not.toBeInTheDocument();
 });

 test("note deletion synchronizes with favorite list", ()=>{
    render(<StickyNotes />);
    
    const titleInput = screen.getByText("test note 1 title");

    const likeButton = screen.getByTestId("likebut1");
    const deleteButton = screen.getByTestId("xbut1");
    fireEvent.click(likeButton);
    fireEvent.click(deleteButton);
    
    expect(titleInput).not.toBeInTheDocument();

  });
});