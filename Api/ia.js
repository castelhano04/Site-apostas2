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
            role: "user",
            content: `Analise o jogo ${jogo} com odd ${odd}`
          }
        ]
      })
    });

    const data = await resposta.json();

    res.status(200).json({
      resultado: data.choices?.[0]?.message?.content || JSON.stringify(data)
    });

  } catch (erro) {
    res.status(500).json({
      resultado: "Erro real: " + erro.message
    });
  }
}
