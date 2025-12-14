import dbConnect from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'PUT':
            try {
                const task = await Task.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!task) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedTask = await Task.deleteOne({ _id: id });
                if (!deletedTask) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
