import { createError } from "../error.js";
import Product from "../models/Product.js";
const permission = ["admin", "staff"];
//get tất cả products

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({ shopID: req.user.id, ...req.body });
    await newProduct.save();
    res.status(200).json("Tạo mới sản phẩm thành công");
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//get một sản phẩm
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return next(createError(403, "Không tìm thấy thông tin sản phẩm"));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
//get sản phẩm theo tag
export const getProductByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const products = await Product.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//update thông tin sản phẩm
export const updateProduct = async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json("Xóa sản phẩm thành công");
      } else {
        return next(
          createError(403, "Bạn không được phép thực hiện chức năng này")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
//xóa sản phẩm
export const deleteProduct = async (req, res, next) => {
  try {
    const product = findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Xóa sản phẩm thành công");
      } else {
        return next(
          createError(403, "Bạn không được phép thực hiện chức năng này")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
//thêm tag vào sản phẩm
export const addTag = async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndUpdate(req.params.id, {
          $push: { tags: req.body.new_tag },
        });
        res.status(200).json("Add tag thành công");
      } else {
        return next(
          createError(403, "Bạn không được phép thực hiện chức năng này")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
//xóa tag sản phẩm
export const removeTag = async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndUpdate(req.params.id, {
          $pull: { tags: req.body.reove_tag },
        });
        res.status(200).json("Xóa tag thành công");
      } else {
        return next(
          createError(403, "Bạn không được phép thực hiện chức năng này")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
//update giá bán hiện tại của sản phẩm
export const updatePrice = async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndUpdate(req.params.id, {
          $set: { currentPrice: req.body.price },
        });
        res.status(200).json("Cập nhật mức giá thành công");
      } else {
        return next(
          createError(403, "Bạn không được phép thực hiện chức năng này")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
// thêm lượt thích sản phẩm
export const addLike = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      $inc: { like: 1 },
    });
    res.status(200).json("Thêm Like thành công.");
  } catch (err) {
    next(err);
  }
};
//bớt lượt thích sản phẩm
export const subLike = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      $inc: { like: -1 },
    });
    res.status(200).json("Giảm Like thành công.");
  } catch (err) {
    next(err);
  }
};
//tìm kiếm sản phẩm
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      productName: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
