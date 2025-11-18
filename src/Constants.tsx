
// -----------------------------
// DISTRICTS → TEHSILS MAPPING
// -----------------------------
export const DISTRICTS_WITH_TEHSILS: Record<string, string[]> = {
    Pulwama: [
        'Aripal',
        'Awantipora',
        'Baigund',
        'Bargam',
        'Batagund',
        'Bathnoor',
        'Batpora',
        'Bouli',
        'Buchoo',
        'Chattargam'
    ],

    Shopian: [
        'Shopian',
        'Keller',
        'Keegam',
        'Hermain',
        'Chitragam',
        'Barbugh ImamSahib',
        'Zainapora'
    ],

    Kulgam: [
        'Kulgam',
        'Damhal Hanjipora',
        'Devsar',
        'Frisal',
        'Yaripora',
        'Qaimoh',
        'Pahloo'
    ]
};

// For district dropdown
export const DISTRICTS = Object.keys(DISTRICTS_WITH_TEHSILS);

// -----------------------------
// GRADES
// -----------------------------
export const GRADES = [
    '1ST',
    '2ND',
    '3RD',
    '4TH',
    '5TH',
    '6TH',
    '7TH',
    '8TH',
    '9TH',
    '10TH',
    '11TH',
    '12TH',
    'OTHER'
];

// -----------------------------
// FORM VALIDATION REGEX
// -----------------------------
export const NAME_REGEX = /^[A-Za-z\s]+$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,6}$/;

export const PHONE_REGEX = /^[6-9]\d{9}$/;
