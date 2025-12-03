import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, desc, photo } = req.body;
    const filePath = path.join(process.cwd(), 'api', 'nodes.json');
    let nodes = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

    const newNode = {
      id: Date.now(),
      name,
      desc,
      photo
    };

    nodes.push(newNode);
    fs.writeFileSync(filePath, JSON.stringify(nodes, null, 2));
    res.status(200).json(nodes);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
