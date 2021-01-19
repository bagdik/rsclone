import mongoose from 'mongoose';

import '../models/Note';

const Note = mongoose.model('Note');

// mongodb+srv://bahdan:<password>@cluster0.asxk9.mongodb.net/<dbname>?retryWrites=true&w=majority
export function setUpConnection() {
  mongoose.connect('mongodb+srv://bahdan:myMongo@cluster0.asxk9.mongodb.net/notes?retryWrites=true&w=majority');
}

export function listNotes() {
  return Note.find();
}

export function createNote(data) {
  const note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date(),
  });

  return note.save();
}

export function deleteNote(id) {
  return Note.findById(id).remove();
}