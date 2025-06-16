import ErrorResponse from '../utils/ErrorResponse.js';

const getAll = (Model) => async (req, res) => {
  const data = await Model.find();
  res.json({ data });
};

const createOne = (Model) => async (req, res) => {
  const data = await Model.create(req.body);
  res.status(201).json({ data });
};

const getOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findById(id);
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ data });
};

const updateOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ data });
};

const deleteOne = (Model) => async (req, res) => {
  const { id } = req.params;
  const data = await Model.findByIdAndDelete(id);
  if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
  res.json({ data });
};

export { getAll, createOne, getOne, updateOne, deleteOne };
