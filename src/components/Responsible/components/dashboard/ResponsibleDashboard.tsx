
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';
import { useGetAgendaEduStudentInfo } from '@/hooks/useGetAgendaEduStudentInfo';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const studentAllowToSeeCatraca = student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "6º Ano" || student.course == "7º Ano" || student.course == "8º Ano" || student.course == "9º Ano" || student.course == "1ª Série" || student.course == "2ª Série" || student.course == "3ª Série";
    const studentAllowToSeeNightActivies = student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "6º Ano" || student.course == "7º Ano" || student.course == "8º Ano" || student.course == "9º Ano" || student.course == "1ª Série" || student.course == "2ª Série" || student.course == "3ª Série";
    const studentAllowToSeeAuthorizedCarriers = student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "6º Ano" || student.course == "7º Ano" || student.course == "8º Ano" || student.course == "9º Ano" || student.course == "1ª Série" || student.course == "2ª Série" || student.course == "3ª Série";
    const studentAllowToSeeOlympics = student.course == "Berçário II" || student.course == "Maternal I" || student.course == "Maternal II" || student.course == "Pré-Escola I" || student.course == "Pré-Escola II" || student.course == '1º Ano' || student.course == "2º Ano" || student.course == "3º Ano" || student.course == "4º Ano" || student.course == "5º Ano" || student.course == "6º Ano" || student.course == "7º Ano" || student.course == "8º Ano" || student.course == "9º Ano" || student.course == "1ª Série" || student.course == "2ª Série" || student.course == "3ª Série";

    console.log('CURSO: ' + student.course)
    console.log('TURMA: ' + student.class)

    return (
        <>
            {/* create a dashboard with 2 columns side by side with icon in each card*/}
            <div className="md:flex md:flex-col-2 md:flex-row gap-3 p-2 space-y-3 md:space-y-0">

                {studentAllowToSeeOlympics && <SectionIcon href="/olympics" icon="/icons/olympics.svg" title="2XVI Olimpíadas das Bandeiras" />}
                {studentAllowToSeeNightActivies && <SectionIcon href="/nightactivies" icon="/icons/nightactivies.svg" title="Atividades Complementares Noturnas" />}
                {studentAllowToSeeCatraca && <SectionIcon href="/gatemoves" icon="/icons/gate.svg" title="Catraca" />}
                {/*studentAllowToSeeAuthorizedCarriers && <SectionIcon href="/authorizedcarriers" icon="/icons/gate.svg" title="Portadores Autorizados" />*/}

            </div>

        </>

    )
}

