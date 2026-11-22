
import { useState } from 'react';
import type { FormEvent } from 'react';

import type { JournalEntry, Mood } from '../types/journal';

type JournalProps = {
  entries: JournalEntry[];
  onSave: (entry: JournalEntry) => void;
  onUpdate: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
};

const moodOptions: { value: Mood; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
];

function Journal({ entries, onSave, onUpdate, onDelete }: JournalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('neutral');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);

  function resetEditor() {
    setTitle('');
    setContent('');
    setMood('neutral');
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    if (editingId !== null) {
      const updatedEntry: JournalEntry = {
        id: editingId,
        title: title.trim(),
        content: content.trim(),
        mood,
        date: entries.find((entry) => entry.id === editingId)!.date,
      };

      onUpdate(updatedEntry);
    } else {
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        mood,
        date: new Date().toLocaleDateString('en-GB'),
      };

      onSave(newEntry);
    }

    resetEditor();
  }

  function handleEdit(entry: JournalEntry) {
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setEditingId(entry.id);
    setViewingEntry(null);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this journal entry?'
    );

    if (!confirmed) {
      return;
    }

    onDelete(id);
    setViewingEntry(null);

    if (editingId === id) {
      resetEditor();
    }
  }

  return (
    <main className="journal-page">
      <div className="journal-heading">
        <p className="eyebrow">YOUR PERSONAL SPACE</p>
        <h1>My Journal</h1>
        <p>Take a moment to reflect on your day.</p>
      </div>

      <form className="journal-editor" onSubmit={handleSubmit}>
        <div className="editor-header">
          <h2>{editingId ? 'Edit entry' : 'New entry'}</h2>
          <span>{new Date().toLocaleDateString('en-GB')}</span>
        </div>

        <input
          className="entry-title"
          type="text"
          placeholder="Give your entry a title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <textarea
          className="entry-content"
          placeholder="What's on your mind today?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />

        <div className="mood-section">
          <h3>How are you feeling?</h3>

          <div className="mood-options">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`mood-option ${
                  mood === option.value ? 'selected' : ''
                }`}
                onClick={() => setMood(option.value)}
              >
                <span>{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="editor-footer">
          <p>Your thoughts are yours. Take your time.</p>

          <div className="editor-actions">
            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetEditor}
              >
                Cancel
              </button>
            )}

            <button className="save-button" type="submit">
              {editingId ? 'Save changes' : 'Save entry'}
            </button>
          </div>
        </div>
      </form>

      <section className="entries-section">
        <div className="entries-heading">
          <h2>Previous entries</h2>
          <span>{entries.length} entries</span>
        </div>

        {entries.length === 0 ? (
          <div className="empty-entries">
            <span>📖</span>
            <h3>Your story starts here</h3>
            <p>You haven't written any entries yet.</p>
          </div>
        ) : (
          <div className="entries-list">
            {entries.map((entry) => {
              const entryMood = moodOptions.find(
                (option) => option.value === entry.mood
              );

              return (
                <article className="entry-card" key={entry.id}>
                  <div className="entry-card-header">
                    <h3>{entry.title}</h3>
                    <span>{entry.date}</span>
                  </div>

                  <p className="entry-preview">{entry.content}</p>

                  <div className="entry-card-footer">
                    <div className="entry-mood">
                      {entryMood?.emoji} {entryMood?.label}
                    </div>

                    <div className="entry-actions">
                      <button
                        type="button"
                        onClick={() => setViewingEntry(entry)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-action"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {viewingEntry && (
        <div className="entry-modal-backdrop">
          <div className="entry-modal">
            <div className="entry-card-header">
              <h2>{viewingEntry.title}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setViewingEntry(null)}
                aria-label="Close entry"
              >
                ×
              </button>
            </div>

            <p className="modal-date">{viewingEntry.date}</p>

            <p className="modal-content">{viewingEntry.content}</p>

            <div className="entry-mood">
              {
                moodOptions.find(
                  (option) => option.value === viewingEntry.mood
                )?.emoji
              }{' '}
              {
                moodOptions.find(
                  (option) => option.value === viewingEntry.mood
                )?.label
              }
            </div>

            <button
              type="button"
              className="save-button"
              onClick={() => handleEdit(viewingEntry)}
            >
              Edit entry
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Journal;
