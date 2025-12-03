import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, desc, photo, parentId } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });

    const filePath = path.join(process.cwd(), 'api', 'nodes.json');
    let nodes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const newNode = {
      id: Date.now(),
      name,
      desc,
      photo,
      parentId: parentId ?? 0
    };
    nodes.push(newNode);
    fs.writeFileSync(filePath, JSON.stringify(nodes, null, 2));

    res.status(200).json(nodes);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
