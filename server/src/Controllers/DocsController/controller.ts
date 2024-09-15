import { PrismaClient } from "@prisma/client"; // Use the correct PrismaClient import
import { NextFunction, Request, Response } from "express"; // Proper types for Express request/response
import { env } from "@/utils/env";
import crypto from "crypto";
import { Prisma } from "@/prisma/prisma";
import httpError from "http-errors";

export const createNewDoc = async (req: any, res: Response) => {
  try {
    const newDoc = await Prisma.docs.create({
      data: {
        key: crypto.randomBytes(10).toString("hex"), // Generate random key
        content: "", // Empty content
        userId: req.user.id, // Assuming `req.user` contains user data from middleware
      },
    });

    // Redirect to the newly created document page
    res.redirect(`${env.ClientBaseURL}/doc/${newDoc.id}?key=${newDoc.key}`);
  } catch (error) {
    // console.error("Error creating new document:", error);
    res.status(500).json({ error: "Failed to create document" });
  }
};

export const listDocs = async (req: any, res: Response) => {
  try {
    const docs = await Prisma.docs.findMany({
      where: { userId: req.user.id }, // Assuming `req.user` contains user data from middleware
      select: { id: true, title: true, key: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(docs);
  } catch (error) {
    // console.error("Error listing documents:", error);
    res.status(500).json({ error: "Failed to list documents" });
  }
};

export const getDocContent = async (req: any, res: Response) => {
  try {
    const { id, key } = req.params;
    const doc = await Prisma.docs.findFirst({
      where: { id, key },
      select: { content: true, title: true, id: true, key: true },
    });

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      ...doc,
      content: JSON.parse(doc.content || "[]"),
    });
  } catch (error) {
    // // console.error("Error getting document content:", error);
    res.status(500).json({ error: "Failed to get document content" });
  }
};

export const getDocViewContent = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Prisma.docs.findFirst({
      where: { id },
      select: { content: true, title: true, id: true },
    });

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      ...doc,
      content: JSON.parse(doc.content || "[]"),
    });
  } catch (error) {
    // console.error("Error getting document content:", error);
    res.status(500).json({ error: "Failed to get document content" });
  }
};

export const updateDocTitleContent = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, key } = req.params;
    const { title } = req.body;

    if (!title) return next(httpError(400, "Title is required"));

    const doc = await Prisma.docs.findFirst({
      where: { id, key },
      select: { userId: true },
    });

    if (!doc) return next(httpError(404, "Document not found"));

    const updatedDoc = await Prisma.docs.update({
      where: { id, key },
      data: { title },
      select: { content: true },
    });

    res.json(updatedDoc);
  } catch (error) {
    // console.error("Error updating document content:", error);
    res.status(500).json({ error: "Failed to update document content" });
  }
};

export const DeleteDoc = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, key } = req.params;

    const doc = await Prisma.docs.findFirst({
      where: { id, key },
      select: { userId: true },
    });

    if (!doc) return next(httpError(404, "Document not found"));

    // allowing only the owner to delete the document
    const user = req.user;

    if (!user) {
      return next(httpError(401, "Only the owner can delete the document"));
    }
    if (doc.userId !== user.id) {
      return next(httpError(401, "Only the owner can delete the document"));
    }

    await Prisma.docs.delete({ where: { id } });

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    // console.error("Error deleting document:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};
