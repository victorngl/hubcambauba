export async function POST(req: Request) {


    try {

        const strapiPath = req.headers.get('path')

        const strapiMethod = req.headers.get('method')

        const body = await req.formData()

        const apiResponse = await fetch(`https://api.cambauba.org.br${strapiPath}`, {
            cache: 'no-store',
            method: strapiMethod,
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_JWT}`,
            },
            body: (strapiMethod === 'POST') ? body : null,
        });

        const data = await apiResponse.json();

        return Response.json({ data })

    } catch (error) {

        console.error('Erro ao fazer solicitação para a API BACKEND:', error);

        return Response.json({ error: 'Erro interno do servidor' });
    }
}
