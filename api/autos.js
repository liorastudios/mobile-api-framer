export default async function handler(req, res) {
  const username = process.env.MOBILE_USER;
  const password = process.env.MOBILE_PASSWORD;
  const sellerId = process.env.MOBILE_SELLER_ID;

  if (!username || !password || !sellerId) {
    return res.status(500).json({ error: 'Environment variables missing' });
  }

  const url = `https://services.mobile.de/seller-api/sellers/${sellerId}/offers`;

  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Fehler bei mobile.de', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Serverfehler', detail: error.message });
  }
}
