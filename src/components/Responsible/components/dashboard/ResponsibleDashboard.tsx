
import Link from 'next/link';
import { SectionIcon } from './SectionIcon';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    return (
        <>
            {/* create a dashboard with 2 columns side by side with icon in each card*/}
            <div className="flex flex-col md:flex-row gap-3 p-3">

                <SectionIcon href="/gatemoves" icon="/icons/gate.svg" title="Catraca" />
                <SectionIcon href="nightactivies" icon="/icons/nightactiviticies.svg" title="Atividades Complementares Noturnas" />
    
            </div>

        </>

    )
}

