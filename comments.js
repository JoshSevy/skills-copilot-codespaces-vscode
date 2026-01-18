const express = require('express');
const app = express();
app.use(express.json());

let comments = [
	{ id: 1, author: 'Alice', text: 'First comment' },
	{ id: 2, author: 'Bob', text: 'Second comment' },
];

app.get('/', (req, res) => {
	res.send('Comments API');
});

app.get('/comments', (req, res) => {
	res.json(comments);
});

app.get('/comments/:id', (req, res) => {
	const id = Number(req.params.id);
	const c = comments.find(x => x.id === id);
	if (!c) return res.status(404).json({ error: 'Not found' });
	res.json(c);
});

app.post('/comments', (req, res) => {
	const { author, text } = req.body;
	if (!author || !text) return res.status(400).json({ error: 'author and text required' });
	const id = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
	const c = { id, author, text };
	comments.push(c);
	res.status(201).json(c);
});

app.put('/comments/:id', (req, res) => {
	const id = Number(req.params.id);
	const idx = comments.findIndex(x => x.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Not found' });
	const { author, text } = req.body;
	comments[idx] = { id, author: author ?? comments[idx].author, text: text ?? comments[idx].text };
	res.json(comments[idx]);
});

app.delete('/comments/:id', (req, res) => {
	const id = Number(req.params.id);
	const idx = comments.findIndex(x => x.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Not found' });
	const removed = comments.splice(idx, 1)[0];
	res.json(removed);
});

const port = process.env.PORT || 3000;
if (require.main === module) {
	app.listen(port, () => console.log(`Comments API listening on http://localhost:${port}`));
}

module.exports = app;
