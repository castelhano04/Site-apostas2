
export default async function handler(req, res) {
  try {
    const { jogo, odd } = JSON.parse(req.body);

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
            content: "Você é especialista em apostas esportivas."
          },
          {
            role: "user",
            content: `Analise o jogo ${jogo} com odd ${odd}. Diga probabilidade, risco e se vale a pena.`
          }
        ]
      })
    });

    const data = await resposta.json();

    res.status(200).json({
      resultado: data.choices[0].message.content
    });

  } catch (erro) {
    res.status(500).json({
      resultado: "Erro ao analisar"
    });
  }
}
