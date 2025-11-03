import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenGenerator.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid password" });
    }

    const accessToken = generateAccessToken(user, res);
    const refreshToken = generateRefreshToken(user, res);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};



export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      password,
      isStore,
      storeName,
      voen,
      storeDescription,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    let newUser;

    if (!isStore) {
      newUser = new User({ firstname, lastname, email, phone, password });
    } else {
      if (!storeName || !voen || !storeDescription) {
        return res.status(400).json({ message: "please fill all fields" });
      }
      newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        password,
        isStore,
        storeName,
        voen,
        role: "store",
        storeDescription,
      });
    }

    await newUser.save();

    const accessToken = generateAccessToken(newUser, res);
    const refreshToken = generateRefreshToken(newUser, res);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.status(200).json({ accessToken, refreshToken, newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "no token provided" });
    }
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return  res.status(404).json({ message: "user not found" });
    if (user.refreshToken !== token) {
      return res.status(403).json({ message: "invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user, res);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};


export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("accessToken")
     .clearCookie("refreshToken")
     .json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}
