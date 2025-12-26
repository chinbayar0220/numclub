// club-labels.js - Label mappings for club data

// Direction labels (English enum -> Mongolian display)
export const directionLabels = {
    'it': 'Мэдээллийн технологи',
    'science': 'Шинжлэх ухаан',
    'sport': 'Спорт',
    'art': 'Урлаг',
    'volunteer': 'Сайн дурын',
    'humanitarian': 'Хүмүүнлэгийн',
    'photo': 'Гэрэл зураг',
    'language': 'Хэл судлал'
};

// School labels (English enum -> Mongolian display)
export const schoolLabels = {
    'bs': 'Бизнесийн сургууль',
    'its': 'Мэдээлэл технологийн сургууль',
    'mtes': 'Mechanical and Transportation Engineering School',
    'uts': 'УТСОХУС',
    'khs': 'Хүмүүнлэгийн ухааны сургууль',
    'shus': 'Нийгмийн ухааны сургууль'
};

// Helper function to get direction label
export function getDirectionLabel(directionEnum) {
    return directionLabels[directionEnum] || directionEnum;
}

// Helper function to get school label
export function getSchoolLabel(schoolEnum) {
    return schoolLabels[schoolEnum] || schoolEnum;
}

// Helper function to get multiple direction labels
export function getDirectionLabels(directionsArray) {
    if (!directionsArray || !Array.isArray(directionsArray)) return [];
    return directionsArray.map(dir => getDirectionLabel(dir));
}
