
export async function POST(req: Request) {
    try {
        const strapiPath = req.headers.get('path')
        const strapiMethod = req.headers.get('method')

        const apiResponse = await fetch(`https://api.cambauba.org.br${strapiPath}`, {
            method: strapiMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.STRAPI_JWT}`,
            },
            body: (strapiMethod === 'GET') ? null : req.body,
        });

        const data = await apiResponse.json();

        return Response.json({ data })

    } catch (error) {

        console.error('Erro ao fazer solicitação para a API:', error);

        return Response.json({ error: 'Erro interno do servidor' });
    }
}
