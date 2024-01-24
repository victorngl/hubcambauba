export const NightacvivitySubscriptionCard = ({ subscription }: { subscription: NightactivitiesSubscriptionInput }) => {

    return (
        <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Inscrição realizada com sucesso!</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700">Atividade prioritária: <b>{subscription.priority}</b></p>

            <p className="font-semibold">1º Opção</p>
            <p className="mb-3 font-normal text-gray-700">{subscription.priority === "Cultural" ? subscription.culturalActivity : subscription.esportiveActivity}</p>

            <p className="font-semibold">2º Opção</p>
            <p className="mb-3 font-normal text-gray-700">{subscription.priority === "Cultural" ? subscription.esportiveActivity : subscription.culturalActivity}</p>

            <p className="font-semibold">3º Opção</p>
            <p className="mb-3 font-normal text-gray-700">{subscription.optionActivity}</p>


            <p className="mb-3 text-xs text-gray-700">Inscrição realizada em {subscription.answerTime.toLocaleString()} pelo usuário {subscription.userAnswer}</p>

            {/*}
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Alterar Inscrição
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
            */}
        </div>
    )

}