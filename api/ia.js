
export default async function handler(req, res) {
  try {
    // Corrige leitura do body (funciona no Vercel)
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { jogo, odd } = body;

    if (!jogo || !odd) {
      return res.status(400).json({
        resultado: "Dados inválidos"
      });
    }

    const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em apostas esportivas, direto e analítico."
          },
          {
            role: "user",
            content: `Analise o jogo ${jogo} com odd ${odd}.
            
Diga:
- Probabilidade (%)
- Nível de risco (baixo, médio, alto)
- Se vale a pena apostar`
          }
        ]
      })
    });

    const data = await resposta.json();

    // Se a API der erro, mostra
    if (!resposta.ok) {
      return res.status(500).json({
        resultado: "Erro da IA: " + JSON.stringify(data)
      });
    }

    return res.status(200).json({
      resultado: data.choices?.[0]?.message?.content || "Sem resposta da IA"
    });

  } catch (erro) {
    return res.status(500).json({
      resultado: "Erro servidor: " + erro.message
    });
  }
}
