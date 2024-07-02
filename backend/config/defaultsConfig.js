const defaultsConfig = {
    moods: [
        { name: 'Very Good' },
        { name: 'Good' },
        { name: 'Meh' },
        { name: 'Bad' },
        { name: 'Awful' }
    ],
    categories: [
        { name: 'Emotions' },
        { name: 'Sleep' },
        { name: 'Health' },
        { name: 'Hobbies' },
        { name: 'Food' },
        { name: 'Social' },
        { name: 'Better Me' },
        { name: 'Productivity' },
        { name: 'School' },
        { name: 'Chores' },
        { name: 'Romance' },
        { name: 'Beauty' },
        { name: 'Places' },
        { name: 'Bad Habits' },
        { name: 'Work' }
    ],
    activities: [
        // EMOTIONS
        { name: 'happy', category: 'Emotions', isDefault: true, userId: null },
        { name: 'excited', category: 'Emotions', isDefault: true, userId: null },
        { name: 'grateful', category: 'Emotions', isDefault: true, userId: null },
        { name: 'relaxed', category: 'Emotions', isDefault: true, userId: null },
        { name: 'content', category: 'Emotions', isDefault: true, userId: null },
        { name: 'tired', category: 'Emotions', isDefault: true, userId: null },
        { name: 'unsure', category: 'Emotions', isDefault: true, userId: null },
        { name: 'bored', category: 'Emotions', isDefault: true, userId: null },
        { name: 'anxious', category: 'Emotions', isDefault: true, userId: null },
        { name: 'angry', category: 'Emotions', isDefault: true, userId: null },
        { name: 'stressed', category: 'Emotions', isDefault: true, userId: null },
        { name: 'sad', category: 'Emotions', isDefault: true, userId: null },
        { name: 'desperate', category: 'Emotions', isDefault: true, userId: null },
        // SLEEP
        { name: 'good sleep', category: 'Sleep', isDefault: true, userId: null },
        { name: 'medium sleep', category: 'Sleep', isDefault: true, userId: null },
        { name: 'bad sleep', category: 'Sleep', isDefault: true, userId: null },
        { name: 'sleep early', category: 'Sleep', isDefault: true, userId: null },
        // HEALTH
        { name: 'exercise', category: 'Health', isDefault: true, userId: null },
        { name: 'eat healthy', category: 'Health', isDefault: true, userId: null },
        { name: 'drink water', category: 'Health', isDefault: true, userId: null },
        { name: 'walk', category: 'Health', isDefault: true, userId: null },
        { name: 'sport', category: 'Health', isDefault: true, userId: null },
        // HOBBIES
        { name: 'movies & tv', category: 'Hobbies', isDefault: true, userId: null },
        { name: 'read', category: 'Hobbies', isDefault: true, userId: null },
        { name: 'gaming', category: 'Hobbies', isDefault: true, userId: null },
        { name: 'relax', category: 'Hobbies', isDefault: true, userId: null },
        // FOOD
        { name: 'fast food', category: 'Food', isDefault: true, userId: null },
        { name: 'homemade cooking', category: 'Food', isDefault: true, userId: null },
        { name: 'restaurant eating', category: 'Food', isDefault: true, userId: null },
        { name: 'delivery food', category: 'Food', isDefault: true, userId: null },
        { name: 'no meat food', category: 'Food', isDefault: true, userId: null },
        { name: 'no sweets food', category: 'Food', isDefault: true, userId: null },
        { name: 'no soda food', category: 'Food', isDefault: true, userId: null },
        // SOCIAL
        { name: 'family', category: 'Social', isDefault: true, userId: null },
        { name: 'friends', category: 'Social', isDefault: true, userId: null },
        { name: 'party', category: 'Social', isDefault: true, userId: null },
        // BETTER ME
        { name: 'meditation', category: 'Better Me', isDefault: true, userId: null },
        { name: 'kindness', category: 'Better Me', isDefault: true, userId: null },
        { name: 'listen', category: 'Better Me', isDefault: true, userId: null },
        { name: 'donate', category: 'Better Me', isDefault: true, userId: null },
        // PRODUCTIVITY
        { name: 'start early', category: 'Productivity', isDefault: true, userId: null },
        { name: 'make list', category: 'Productivity', isDefault: true, userId: null },
        { name: 'focus', category: 'Productivity', isDefault: true, userId: null },
        { name: 'take a break', category: 'Productivity', isDefault: true, userId: null },
        // SCHOOL
        { name: 'class', category: 'School', isDefault: true, userId: null },
        { name: 'study', category: 'School', isDefault: true, userId: null },
        { name: 'homework', category: 'School', isDefault: true, userId: null },
        { name: 'exam', category: 'School', isDefault: true, userId: null },
        { name: 'group project', category: 'School', isDefault: true, userId: null },
        // CHORES
        { name: 'shopping', category: 'Chores', isDefault: true, userId: null },
        { name: 'cleaning', category: 'Chores', isDefault: true, userId: null },
        { name: 'cooking', category: 'Chores', isDefault: true, userId: null },
        { name: 'laundry', category: 'Chores', isDefault: true, userId: null },
        // ROMANCE
        { name: 'date', category: 'Romance', isDefault: true, userId: null },
        { name: 'give gift', category: 'Romance', isDefault: true, userId: null },
        { name: 'flowers', category: 'Romance', isDefault: true, userId: null },
        { name: 'appreciate', category: 'Romance', isDefault: true, userId: null },
        { name: 'time together', category: 'Romance', isDefault: true, userId: null },
        // BEAUTY
        { name: 'haircut', category: 'Beauty', isDefault: true, userId: null },
        { name: 'wellness', category: 'Beauty', isDefault: true, userId: null },
        { name: 'massage', category: 'Beauty', isDefault: true, userId: null },
        { name: 'manicure', category: 'Beauty', isDefault: true, userId: null },
        { name: 'pedicure', category: 'Beauty', isDefault: true, userId: null },
        { name: 'skin care', category: 'Beauty', isDefault: true, userId: null },
        { name: 'spa', category: 'Beauty', isDefault: true, userId: null },
        // PLACES
        { name: 'home', category: 'Places', isDefault: true, userId: null },
        { name: 'work', category: 'Places', isDefault: true, userId: null },
        { name: 'school', category: 'Places', isDefault: true, userId: null },
        { name: 'visit', category: 'Places', isDefault: true, userId: null },
        { name: 'travel', category: 'Places', isDefault: true, userId: null },
        { name: 'gym', category: 'Places', isDefault: true, userId: null },
        { name: 'cinema', category: 'Places', isDefault: true, userId: null },
        { name: 'nature', category: 'Places', isDefault: true, userId: null },
        { name: 'vacation', category: 'Places', isDefault: true, userId: null },
        // BAD HABITS
        { name: 'alcohol', category: 'Bad Habits', isDefault: true, userId: null },
        { name: 'smoking', category: 'Bad Habits', isDefault: true, userId: null },
        { name: 'snacking', category: 'Bad Habits', isDefault: true, userId: null },
        { name: 'nail biting', category: 'Bad Habits', isDefault: true, userId: null },
        { name: 'procrastinating', category: 'Bad Habits', isDefault: true, userId: null },
        // WORK
        { name: 'end on time', category: 'Work', isDefault: true, userId: null },
        { name: 'overtime', category: 'Work', isDefault: true, userId: null },
        { name: 'team building', category: 'Work', isDefault: true, userId: null },
        { name: 'business trip', category: 'Work', isDefault: true, userId: null },
        { name: 'sick day', category: 'Work', isDefault: true, userId: null }
    ]
};

export default defaultsConfig;
