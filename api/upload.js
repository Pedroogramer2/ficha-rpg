// api/upload.js (Roda SOMENTE no Servidor da Vercel)

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const IMGBB_API_KEY = process.env.IMGBB_SECRET_KEY;

  try {
   
    const respostaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: req, 
      duplex: 'half' 
    });

    const dadosImgbb = await respostaImgbb.json();

    if (dadosImgbb.success) {
      
      res.status(200).json({ success: true, url: dadosImgbb.data.url });
    } else {
      res.status(400).json({ success: false, error: 'ImgBB rejeitou a imagem' });
    }
  } catch (error) {
    console.error("Erro na API da Vercel:", error);
    res.status(500).json({ success: false, error: 'Erro no servidor intermediário' });
  }
}