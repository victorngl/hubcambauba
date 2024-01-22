
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';
import { useGetAgendaEduStudentInfo } from '@/hooks/useGetAgendaEduStudentInfo';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const studentAllowToSeeCatraca = student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "6º Ano" || student.course == "7º Ano" || student.course == "8º Ano" || student.course == "9º Ano" || student.course == "1ª Série" || student.course == "2ª Série" || student.course == "3ª Série";
    const studentAllowToSeeNightActivies = student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "1ª Série";

    return (
        <>
            {/* create a dashboard with 2 columns side by side with icon in each card*/}
            <div className="md:flex md:flex-col-2 md:flex-row gap-3 p-2 space-y-3 md:space-y-0">
            
                {studentAllowToSeeCatraca && <SectionIcon href="/gatemoves" icon="/icons/gate.svg" title="Catraca" />}
                {studentAllowToSeeNightActivies && <SectionIcon href="/nightactivies" icon="/icons/nightactivies.svg" title="Atividades Complementares Noturnas" />}
    
            </div>

        </>

    )
}

