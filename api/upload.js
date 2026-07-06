// api/upload.js (Modo Edge - Vercel)

export const config = {
  runtime: 'edge', // 👈 A MÁGICA: Ativa o motor moderno da Vercel!
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), { 
      status: 405, 
      headers: { 'content-type': 'application/json' } 
    });
  }

  // A chave secreta continua guardada a 7 chaves
  const IMGBB_API_KEY = process.env.IMGBB_SECRET_KEY;

  try {
    // 1. O Edge lê o arquivo enviado pelo React perfeitamente
    const formData = await req.formData();
    
    // 2. Dispara a imagem direto pro ImgBB com a formatação perfeita
    const respostaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });

    const dadosImgbb = await respostaImgbb.json();

    if (dadosImgbb.success) {
      // 3. Devolve a URL da imagem de volta pro Chat/Mapa
      return new Response(JSON.stringify({ success: true, url: dadosImgbb.data.url }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    } else {
      console.error("Erro do ImgBB:", dadosImgbb);
      return new Response(JSON.stringify({ success: false, error: 'ImgBB rejeitou a imagem' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("Erro na API da Vercel:", error);
    return new Response(JSON.stringify({ success: false, error: 'Erro no servidor intermediário' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}