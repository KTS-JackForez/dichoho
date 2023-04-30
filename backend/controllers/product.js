import { createError } from "../error.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
const permission = ["admin", "staff"];
//get tất cả products

export const createProduct = async (req, res, next) => {
  try {
    if (!req.body.stockPrice)
      return res.status(403).json("Giá niêm yết không hợp lệ");
    if (!req.body.currentPrice)
      return res.status(403).json("Giá bán không hợp lệ");
    if (req.body?.imgs.length < 1)
      return res.status(403).json("Hình ảnh sản phẩm không hợp lệ");
    const newProduct = new Product({ shopID: req.user.id, ...req.body });
    await newProduct.save();
    res.status(200).json("Tạo mới sản phẩm thành công");
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const query = q ? q.replaceAll(" - ", " ") : "";
    const products = await Product.find({
      active: true,
      cat: { $regex: query, $options: "i" },
    });

    if (!products) return res.status(404).json("chưa có dữ liệu");
    res.status(200).json(products.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
export const getLastest = async (req, res, next) => {
  const limit = req.params.limit || 0;
  try {
    const products = await Product.find({ active: true });
    const list =
      limit > 0
        ? products.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit)
        : products.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const getHostest = async (req, res, next) => {
  const limit = req.params.limit || 0;
  try {
    const products = await Product.find({ active: true });
    const list =
      limit > 0
        ? products.sort((a, b) => b.outStock - a.outStock).slice(0, limit)
        : products.sort((a, b) => b.outStock - a.outStock);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
//get sản phẩm của user
export const getMyProducts = async (req, res, next) => {
  try {
    const products = permission.includes(req.user.role)
      ? await Product.find()
      : await Product.find({ shopID: req.user.id, active: true });
    if (!products) {
      return res.status(403).json("Chưa có thông tin sản phẩm");
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getShopProducts = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const shop = await User.findById(shopId);
    if (!shop) return res.status(404).json("Shop không khả dụng");
    if (shop.status < 1) return res.status(403).json("Shop không khả dụng");
    const checkFollow = shop.likedBy.includes(req.params.userId);
    const products = await Product.find({ shopID: shopId });
    const address =
      shop.address +
      ", " +
      shop.wardFullName +
      ", " +
      shop.districtFullName +
      ", " +
      shop.cityFullName;
    res.status(200).json({
      shop: {
        displayName: shop?.displayName || "Sale168.vn",
        createdAt: shop.createdAt,
        numberFolower: shop?.likedBy.length || 0,
        followed: checkFollow,
        address,
      },
      products,
    });
  } catch (error) {
    next(error);
  }
};
//get một sản phẩm
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(403).json("Không tìm thấy thông tin sản phẩm");
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
    if (!req.body.stockPrice)
      return res.status(403).json("Giá niêm yết không hợp lệ");
    if (!req.body.currentPrice)
      return res.status(403).json("Giá bán không hợp lệ");
    if (req.body?.imgs.length < 1)
      return res.status(403).json("Hình ảnh sản phẩm không hợp lệ");
    const product = await Product.findById(req.params.id);
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
        res.status(200).json("Cập nhật sản phẩm thành công");
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
    const product = await Product.findById(req.params.id);
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
    const product = await Product.findById(req.params.id);
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
    const product = await Product.findById(req.params.id);
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
    const product = await Product.findById(req.params.id);
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
// chuyển đổi trạng thái sản phẩm
export const setStatus = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Không tìm thấy thông tin sản phẩm"));
    } else {
      if (
        product.shopID === req.user.id ||
        permission.includes(req.user.role)
      ) {
        await Product.findByIdAndUpdate(req.params.id, {
          $set: { status: req.body.status },
        });
        res.status(200).json("Cập nhật trạng thái sản phẩm thành công");
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
    }).limit(5);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
