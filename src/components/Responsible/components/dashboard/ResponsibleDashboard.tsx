
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';
import { useGetAgendaEduStudentInfo } from '@/hooks/useGetAgendaEduStudentInfo';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const studentAllowToSeeCatraca = student.class == '1º Ano' || student.class == "2º Ano" || student.class == "3º Ano" || student.course == "4º Ano" || student.class == "5º Ano" || student.class == "6º Ano" || student.class == "7º Ano" || student.class == "8º Ano" || student.class == "9º Ano" || student.class == "1ª Série" || student.class == "2ª Série" || student.class == "3ª Série";
    const studentAllowToSeeNightActivies = student.class == '1º Ano' || student.class == "2º Ano" || student.class == "3º Ano" || student.course == "4º Ano" || student.class == "5º Ano" || student.class == "6º Ano" || student.class == "7º Ano" || student.class == "8º Ano" || student.class == "9º Ano" || student.class == "1ª Série" || student.class == "2ª Série" || student.class == "3ª Série";

    console.log('CURSO: ' + student.course)
    console.log('TURMA: ' + student.class)

    return (
        <>
            {/* create a dashboard with 2 columns side by side with icon in each card*/}
            <div className="md:flex md:flex-col-2 md:flex-row gap-3 p-2 space-y-3 md:space-y-0">
            
                {studentAllowToSeeNightActivies && <SectionIcon href="/nightactivies" icon="/icons/nightactivies.svg" title="Atividades Complementares Noturnas" />}
                {studentAllowToSeeCatraca && <SectionIcon href="/gatemoves" icon="/icons/gate.svg" title="Catraca" />}

            </div>

        </>

    )
}

