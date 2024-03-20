
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';
import { useGetAgendaEduStudentInfo } from '@/hooks/useGetAgendaEduStudentInfo';
import { checkCourse, checkCourseElementarySchoolOne, checkCourseElementarySchoolTwo, checkCourseHighSchool } from '@/lib/utils/check-course';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const studentAllowToSeeCatraca = checkCourseElementarySchoolOne(student.course) 
    || checkCourseElementarySchoolTwo(student.course)
    || checkCourseHighSchool(student.course);

    const studentAllowToSeeNightActivies = checkCourseElementarySchoolOne(student.course) 
    || checkCourseElementarySchoolTwo(student.course)
    || checkCourseHighSchool(student.course);

    const studentAllowToSeeAuthorizedCarriers = checkCourseElementarySchoolOne(student.course) 
    || checkCourseElementarySchoolTwo(student.course)
    || checkCourseHighSchool(student.course);
    
    const studentAllowToSeeOlympics = checkCourse(student.course);

    const studentAllowToSeeFiles = checkCourse(student.course);


    const studentAllowToSeeSolicitation = student.course == "1ª Série"


    console.log('CURSO: ' + student.course)
    console.log('TURMA: ' + student.class)

    return (
        <>
            {/* create a dashboard with 2 columns side by side with icon in each card*/}
            <div className="grid grid-cols-2 items-center gap-3 p-2 md:space-y-0">

                {studentAllowToSeeOlympics && <SectionIcon href="/responsible/olympics" icon="/icons/olympics.svg" title="XVI Olimpíadas das Bandeiras" />}
                {studentAllowToSeeNightActivies && <SectionIcon href="/responsible/nightactivies" icon="/icons/nightactivies.svg" title="Atividades Complementares Noturnas" />}
                {studentAllowToSeeSolicitation && <SectionIcon href="/responsible/solicitations" icon="/icons/solicitation.svg" title="Solicitações" />}
                {studentAllowToSeeCatraca && <SectionIcon href="/responsible/gatemoves" icon="/icons/gate.svg" title="Catraca" />}
                {/*studentAllowToSeeAuthorizedCarriers && <SectionIcon href="/authorizedcarriers" icon="/icons/gate.svg" title="Portadores Autorizados" />*/}
                {studentAllowToSeeFiles && <SectionIcon href="/responsible/school-files" icon="/icons/files-black.svg" title="Arquivos" />}

            </div>
            

        </>

    )
}

