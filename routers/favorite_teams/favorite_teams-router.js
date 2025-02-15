const router = require("express").Router();
const db = require("./favorite_teams-model");
const restricted = require('../../auth/authMiddleware.js')

// Get all favorite teams

router.get("/", restricted, (req, res) => {
  db.getFavoriteTeams()
    .then(favorites => {
      if (favorites) {
        res.status(200).json(favorites);
      } else {
        res
          .status(500)
          .json({ error: "There are no favorite teams available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting favorite teams" });
    });
});

// Get favorite teams by profile id

router.get("/:profile_id", (req, res) => {
  const { profile_id } = req.params;
  db.getFavoriteTeamsByProfileId(profile_id)
    .then(favorites => {
      if (favorites) {
        res.status(200).json(favorites);
      } else {
        res
          .status(500)
          .json({ error: "That profile does not have any favorite teams" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting favorite teams" });
    });
});

// post favorite team to profile

router.post('/', restricted, (req, res) => {
  const teamData = req.body
  const profile_id = req.user.profile_id
  console.log("req", req.user)
  db.insertFavoriteTeamByUser({...teamData, profile_id})
    .then(team => {
      res.status(200).json(team)
    })
    .catch(error => {
      res.status(500).json({message: "Failed to Post"})
      console.log("error", error)
    })
})

// delete favorite team from profile

router.delete('/:favorite_id', (req, res) => {
  const {favorite_id} = req.params
  db.removeFavoriteTeamByUser(favorite_id)
    .then(deleted => {
      if(deleted) {
        return res.status(204).end()
      } else {
        res.status(404).json({message: "could not delete"})
      }
    })
    .catch(error => {
      res.status(500).json({message: "Failed to delete"})
    })
})

module.exports = router;
