import express from 'express';
import { createProduct,
      getAllProducts,
      getProductDetails,
      editProduct,
      deleteProduct } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/', getAllProducts);
router.post('/create', createProduct);
router.get('/:id/details', getProductDetails);
router.put('/:id/edit', editProduct);
router.delete('/:id/delete', deleteProduct);

export default router;