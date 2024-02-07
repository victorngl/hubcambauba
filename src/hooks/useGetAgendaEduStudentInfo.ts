export function useGetAgendaEduStudentInfo({ responsible }) {
    const responsibleStudent = responsible.included.find(o => o.type === 'family_profile');

    const studentClassroomsText = responsible.included
        .filter(o => o.type === 'classroom')
        .map(c => `${c.attributes.name}`)[0]

    const separatedStrings = studentClassroomsText.split(' - ');
    const studentClass = separatedStrings[1];
    const studentCourse = separatedStrings[0];

    const student = {
        id: responsibleStudent.id,
        name: responsibleStudent.attributes.name,
        class: studentClass,
        course: studentCourse,
    }
   
    return { student };
}
