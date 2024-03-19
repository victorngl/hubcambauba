import TransitoGentilPageHeader from "@/components/Responsible/components/projects/transitogentil/transitogentil-page-header";
import Link from "next/link";

export default function TransitoGentilPage() {
    return (
        <>
            <div className="text-center">
                <div className="p-2 w-full">
                    <TransitoGentilPageHeader />
                    <Link href="https://api.cambauba.org.br/uploads/Transito_Gentil_Cartilha_eb9a6b288d.pdf" target="_blank" >
                        <div className="bg-yellow-400 text-zinc-700 font-bold p-2 rounded">
                            Clique para baixar a Cartilha
                        </div>
                    </Link>
                    <div className="my-2 flex justify-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ljccyQNtqE8?si=CYVwMCbWOERdR2Y3&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    
                </div>
            </div>
        </>
    )
}