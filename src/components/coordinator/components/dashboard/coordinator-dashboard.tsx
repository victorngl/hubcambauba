
import { SectionIcon } from '../../../ui/icons/section-icon';
export const CoordinatorDashboard = ({ coordinator }: { coordinator: any }) => {

    return (
        <>
            <div className="grid grid-cols-2 items-center gap-3 p-2 md:space-y-0">
                <SectionIcon href="/coordinator/solicitations" icon="/icons/solicitation.svg" title="Solicitações" />
            </div>
            
        </>

    )
}

