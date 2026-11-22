export type Mood = 
    | 'happy'
    | 'calm'
    | 'neutral'
    | 'sad'
    | 'anxious';

export type JournalEntry = {
    id: string;
    title: string;
    content: string;
    mood: Mood;
    date: string
};