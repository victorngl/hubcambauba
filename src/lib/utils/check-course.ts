export function checkCourse(course: string) {
    return course == "Integral" ||
    course == "Berçário II / Maternal I" ||
    course == "Berçário II" || 
    course == "Maternal I" || 
    course == "Maternal II" || 
    course == "Pré-Escola I" || 
    course == "Pré-Escola II" || 
    course == '1º Ano' || 
    course == "2º Ano" || 
    course == "3º Ano" || 
    course == "4º Ano" || 
    course == "5º Ano" || 
    course == "6º Ano" || 
    course == "7º Ano" || 
    course == "8º Ano" || 
    course == "9º Ano" || 
    course == "1ª Série" || 
    course == "2ª Série" || 
    course == "3ª Série";
}

export function checkCourseChildEducation(course: string) {
    return course == "Integral" ||
    course == "Berçário II / Maternal I" ||
    course == "Berçário II" || 
    course == "Maternal I" || 
    course == "Maternal II" || 
    course == "Pré-Escola I" || 
    course == "Pré-Escola II";
}

export function checkCourseElementarySchoolOne(course: string) {
    return course == '1º Ano' || 
    course == "2º Ano" || 
    course == "3º Ano" || 
    course == "4º Ano" || 
    course == "5º Ano" 
}

export function checkCourseElementarySchoolTwo(course: string) {
    return course == '6º Ano' || 
    course == "7º Ano" || 
    course == "8º Ano" || 
    course == "9º Ano"
}

export function checkCourseHighSchool(course: string) {
    return course == "1ª Série" || 
    course == "2ª Série" || 
    course == "3ª Série";
}