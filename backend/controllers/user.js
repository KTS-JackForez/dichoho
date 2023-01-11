import { createError } from "../error.js";
import User from "../models/User.js";

//get một user
export const getUser = async (req, res, next) => {
  try {
    res.status(200).json("getUser");
  } catch (error) {
    next(error);
  }
};
//get nhiều user, áp dụng cho admin/staff
export const getUsers = async (req, res, next) => {
  try {
    res.status(200).json("getUserssssssss");
  } catch (error) {
    next(error);
  }
};
//get user theo số phone
export const getByPhone = async (req, res, next) => {
  try {
    res.status(200).json("getByPhone");
  } catch (error) {
    next(error);
  }
};
//update thông tin user
export const updateUser = async (req, res, next) => {
  try {
    res.status(200).json("updateUser");
  } catch (error) {
    next(error);
  }
};
//update quyền của user
export const updateUserRole = async (req, res, next) => {
  try {
    res.status(200).json("updateUserRole");
  } catch (error) {
    next(error);
  }
};
// delete một user
export const deleteUser = async (req, res, next) => {
  try {
    res.status(200).json("deleteUser");
  } catch (error) {
    next(error);
  }
};
