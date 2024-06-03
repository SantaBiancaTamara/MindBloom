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
        { name: 'School' }, 
        { name: 'Chores' }, 
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
        //     isDefault: true,
        //     userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
        },
        {
            name: 'party',
            category: 'Social',
            description: '',
            moodImpact: 'neutral',
            additionalAttributes: {
                duration: '',
                frequency: ''
            },
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
        },
        {
            name: 'kindness',
            category: 'Better Me',
            description: 'Be kind for no reason',
            moodImpact: 'positive',
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
        },
        {
            name: 'vacation',
            category: 'Places',
            description: '',
            moodImpact: 'neutral',
            additionalAttributes: {
                duration: '',
                frequency: ''
            },
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
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
            isDefault: true,
            userId: null
        },
    ]
};

export default defaultsConfig;
