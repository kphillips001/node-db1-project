const express = require('express');

//database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get("/", (req, res) => {
  // select * from posts;
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id: id })
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData, "id")
    .then(account => {
      const id = ids[0];
      db("accounts")
        .where({ id })
        .first()
        .then(account => {
          res.status(201).json({ data: account });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  // update posts set title = 'new title' where id = 5;
  db("accounts")
    .where({ id }) // remember to filter
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account update successful" });
      } else {
        res.status(404).json({ message: "Account was not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Account deletion successful" });
      } else {
        res.status(404).json({
          message: "Account was not found (it may have been deleted)",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;