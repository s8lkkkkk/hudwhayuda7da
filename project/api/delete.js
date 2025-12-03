import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, key } = req.body;
    if (key !== 'Jagger.0011') return res.status(403).json({ error: 'Unauthorized' });

    const filePath = path.join(process.cwd(), 'api', 'nodes.json');
    let nodes = JSON.parse(fs.readFileSync(filePath));
    nodes = nodes.filter(n => n.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(nodes, null, 2));
    res.status(200).json(nodes);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
