import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, key } = req.body;
    if (key !== 'Jagger.0011') return res.status(403).json({ error: "Unauthorized" });

    const filePath = path.join(process.cwd(), 'api', 'nodes.json');
    let nodes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Remove node and all children recursively
    function removeNodeAndChildren(nodeId) {
      const children = nodes.filter(n => n.parentId === nodeId);
      children.forEach(child => removeNodeAndChildren(child.id));
      nodes = nodes.filter(n => n.id !== nodeId);
    }

    removeNodeAndChildren(id);
    fs.writeFileSync(filePath, JSON.stringify(nodes, null, 2));
    res.status(200).json(nodes);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
