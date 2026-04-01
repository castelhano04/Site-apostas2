export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { jogo, odd } = body;

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
            content: "Você é especialista em apostas esportivas e analisa jogos com precisão."
          },
          {
            role: "user",
            content: `Analise o jogo ${jogo} com odd ${odd}. 
            Diga:
            - Probabilidade (%)
            - Risco
            - Se vale a pena apostar`
          }
        ]
      })
    });

    const data = await resposta.json();

    res.status(200).json({
      resultado: data.choices?.[0]?.message?.content || "Erro na resposta da IA"
    });

  } catch (erro) {
    res.status(500).json({
      resultado: "Erro: " + erro.message
    });
  }
}
