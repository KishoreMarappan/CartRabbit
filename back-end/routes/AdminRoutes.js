import express from 'express';
import { Waitlist } from '../models/Contestmodel.js';
import multer from 'multer';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add-waitlist', upload.single('image'), async (req, res) => {
    console.log('File received:', req.file); // Check what is logged here
    const { name, coupon, amount, description } = req.body;
    const image = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null;
  
    try {
      const newWaitlist = new Waitlist({
        name,
        coupon,
        amount,
        description,
        image, 
      });
      await newWaitlist.save();
      res.json({ status: true, message: 'Waitlist created successfully!', name: newWaitlist.name });
    } catch (error) {
      console.error('Error creating waitlist:', error);
      res.status(500).json({ status: false, message: 'Error creating waitlist' });
    }
});
router.delete('/delete-waitlist/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedWaitlist = await Waitlist.findByIdAndDelete(id);
      if (!deletedWaitlist) {
        return res.status(404).json({ status: false, message: 'Waitlist not found' });
      }
      res.json({ status: true, message: 'Waitlist deleted successfully' });
    } catch (error) {
      console.error('Error deleting waitlist:', error);
      res.status(500).json({ status: false, message: 'Error deleting waitlist' });
    }
  });

  router.put('/update-waitlist/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, coupon, amount, description } = req.body;
    const image = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null;
  
    try {
      const updateData = { name, coupon, amount, description };
      if (image) updateData.image = image;
  
      const updatedWaitlist = await Waitlist.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedWaitlist) {
        return res.status(404).json({ status: false, message: 'Waitlist not found' });
      }
  
      res.json({ status: true, message: 'Waitlist updated successfully', name: updatedWaitlist.name });
    } catch (error) {
      console.error('Error updating waitlist:', error);
      res.status(500).json({ status: false, message: 'Error updating waitlist' });
    }
  });
  
  router.get('/view-waitlists', async (req, res) => {
    try {
      const waitlists = await Waitlist.find().lean();
  
      // Convert buffer to base64 string
      const waitlistsWithBase64Images = waitlists.map(waitlist => {
        return {
          ...waitlist,
          image: waitlist.image && waitlist.image.data
            ? `data:${waitlist.image.contentType};base64,${waitlist.image.data.toString('base64')}`
            : null,
        };
      });
  
      res.json(waitlistsWithBase64Images);
    } catch (error) {
      console.error('Error fetching waitlists:', error);
      res.status(500).json({ status: false, message: 'Error fetching waitlists' });
    }
  });
  
 router.get('/view-waitlist/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the waitlist by ID
      const waitlist = await Waitlist.findById(id).lean();
      
      // Check if the waitlist exists
      if (!waitlist) {
        return res.status(404).json({ status: false, message: 'Waitlist not found' });
      }
  
      if (waitlist.image && waitlist.image.data) {
        waitlist.image = `data:${waitlist.image.contentType};base64,${waitlist.image.data.toString('base64')}`;
      }
  
      // Send response
      res.json({ status: true, data: waitlist });
    } catch (error) {
      console.error('Error fetching waitlist details:', error);
      res.status(500).json({ status: false, message: 'Error fetching waitlist details' });
    }
  });

export default router;
