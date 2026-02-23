export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { username } = req.query;

  if (!username || !/^[a-zA-Z0-9._]{1,30}$/.test(username)) {
    return res.status(400).json({ error: "Usuário inválido" });
  }

  try {
    const response = await fetch(
      `https://instagram-scraper.p.rapidapi.com/v1/instagram/profile/${username}`,
      {
        headers: {
          "x-rapidapi-host": "instagram-scraper.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
}
