const defaultsConfig = {
    moods: [
        { name: 'Very Good' },
        { name: 'Good' },
        { name: 'Meh' },
        { name: 'Bad' },
        { name: 'Awful' }
    ],
    categories: [
        { name: 'Emotions'},
        { name: 'Sleep' },
        { name: 'Health' },
        { name: 'Hobbies' },
        { name: 'Food'},      
        { name: 'Social'},  
        { name: 'Better Me'},   
        { name: 'Productivity'},  
        { name: 'School' }, // Added a new category
        { name: 'Chores' }, // Another new category
        { name: 'Romance'},  
        { name: 'Beauty'},  
        { name: 'Places'},
        { name: 'Bad Habits'},  
        { name: 'Work'}    
    ],
    activities: [

// EMOTIONS -------------------------------------------------------------------------------------------------------------------

{
    name: 'happy',
    category: 'Emotions',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'excited',
    category: 'Emotions',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'grateful',
    category: 'Emotions',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'relaxed',
    category: 'Emotions',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'content',
    category: 'Emotions',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'tired',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'unsure',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'bored',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'anxious',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'angry',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'stressed',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'sad',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'desperate',
    category: 'Emotions',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
// {
//     name: '',
//     category: '',
//     description: '',
//     moodImpact: '',
//     additionalAttributes: {
//         duration: '',
//         frequency: ''
//     },
//     isDefault: true
// },
// SLEEP ---------------------------------------------------------------------------------------------------------------------
{
    name: 'good sleep',
    category: 'Sleep',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'medium sleep',
    category: 'Sleep',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'bad sleep',
    category: 'Sleep',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'sleep early',
    category: 'Sleep',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// HEALTH --------------------------------------------------------------------------------------------------------------------
{
    name: 'exercise',
    category: 'Health',
    description: 'Make some exercises',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'eat healty',
    category: 'Health',
    description: 'Eat something healthy',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'drink water',
    category: 'Health',
    description: 'Drink more water',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'walk',
    category: 'Health',
    description: 'Go for a walk',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'sport',
    category: 'Health',
    description: 'Practice any sport',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// Hobbies ------------------------------------------------------------------------------------------------------------------------
{
    name: 'movies & tv',
    category: 'Hobbies',
    description: 'watch a movie or a tv show',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'read',
    category: 'Hobbies',
    description: 'Read a book',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'gaming',
    category: 'Hobbies',
    description: 'Play a game',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'relax',
    category: 'Hobbies',
    description: 'Relax yourself',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// FOOD -------------------------------------------------------------------------------------------------------------------------
{
    name: 'fast food',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'homemade',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'restaurant',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'delivery',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'no meat',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'no sweets',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'no soda',
    category: 'Food',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// SOCIAL -------------------------------------------------------------------------------------------------------------

{
    name: 'family',
    category: 'Social',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'friends',
    category: 'Social',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'part',
    category: 'Social',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// BETTER ME -------------------------------------------------------------------------------------------------------------------------

{
    name: 'meditation',
    category: 'Better Me',
    description: 'Meditate',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'kindness',
    category: 'Better Me',
    description: 'Be kind for no reason',
    moodImpact: 'positive',
    isDefault: true
},
{
    name: 'listen',
    category: 'Better Me',
    description: 'Listen something you enjoy listening to',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'donate',
    category: 'Better Me',
    description: 'Make a charity act',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// PRODUCTIVITY -------------------------------------------------------------------------------------------------------------------

{
    name: 'start early',
    category: 'Productivity',
    description: 'Start your work early',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'make list',
    category: 'Productivity',
    description: 'Be organized. Make a list',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'focus',
    category: 'Productivity',
    description: 'Stay focused',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'take a break',
    category: 'Productivity',
    description: 'Take a break when you need it',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// SCHOOL -----------------------------------------------------------------------------------------------------------
{
    name: 'class',
    category: 'School',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'study',
    category: 'School',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'homework',
    category: 'School',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'exam',
    category: 'School',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'group project',
    category: 'School',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

//CHORES -----------------------------------------------------------------------------------------------
{
    name: 'shopping',
    category: 'Chores',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'cleaning',
    category: 'Chores',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'cooking',
    category: 'Chores',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'laundry',
    category: 'Chores',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// ROMANCE ------------------------------------------------------------------------------------------------------------------------
{
    name: 'date',
    category: 'Romance',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'give gift',
    category: 'Romance',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'flowers',
    category: 'Romance',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'appreciate',
    category: 'Romance',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'time together',
    category: 'Romance',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// BEAUTY ----------------------------------------------------------------------------------------------------------------------
{
    name: 'haircut',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'wellness',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'massage',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'manicure',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'pedicure',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'skin care',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'spa',
    category: 'Beauty',
    description: '',
    moodImpact: 'positive',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// PLACES ----------------------------------------------------------------------------------------------------------------------
{
    name: 'home',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'work',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'school',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'visit',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'travel',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'gym',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'cinema',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'nature',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'vacantion',
    category: 'Places',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
// BAD HABITS ---------------------------------------------------------------------------------------------------------------------
{
    name: 'alcohol',
    category: 'Bad Habits',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'smoking',
    category: 'Bad Habits',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'snacking',
    category: 'Bad Habits',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'nail biting',
    category: 'Bad Habits',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'procrastinating',
    category: 'Bad Habits',
    description: '',
    moodImpact: 'negative',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

// WORK 
{
    name: 'end on time',
    category: 'Work',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'overtime',
    category: 'Work',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'team building',
    category: 'Work',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},

{
    name: 'business trip',
    category: 'Work',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
{
    name: 'sick day',
    category: 'Work',
    description: '',
    moodImpact: 'neutral',
    additionalAttributes: {
        duration: '',
        frequency: ''
    },
    isDefault: true
},
    ]
};

export default defaultsConfig;
