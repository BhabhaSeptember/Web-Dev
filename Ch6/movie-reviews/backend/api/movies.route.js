import express from 'express';

const router = express.Router(); 

router.route("/").get((req,res) => res.send("Welcome To Movie Night!"));

export default router;