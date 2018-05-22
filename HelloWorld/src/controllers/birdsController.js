exports.get = (req, res, next) => {
    res.status(201).send('get some birds');
};
exports.post = (req, res, next) => {
    res.status(201).send('post some birds');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`put some birds ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`delete some birds ${id}`);
};