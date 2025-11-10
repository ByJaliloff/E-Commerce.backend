import express from 'express';
import { createProduct,
      getAllProducts,
      getProductDetails,
      editProduct,
      deleteProduct } from '../controllers/product.controller.js';
import { authorizeRoles, protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createProductSchema } from '../validation/product.validation.js';


const router = express.Router();

router.get('/', getAllProducts);
router.post('/create', validate(createProductSchema), createProduct);
router.get('/:id/details', getProductDetails);
router.put('/:id/edit', editProduct);
router.delete('/:id/delete', deleteProduct);

export default router;