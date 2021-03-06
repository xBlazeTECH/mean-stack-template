/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var _ = require("lodash");
//var Thing = require("./thing.model");

var Thing = require("./thing.model").getModel();

// Get list of things
exports.index = function (req, res) {
  Thing.find(function (err, things) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(things);
  });
};

// Get a single thing
exports.show = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.sendStatus(404);
    }
    return res.status(200).json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  Thing.create(req.body, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.sendStatus(404);
    }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.sendStatus(404);
    }
    thing.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.sendStatus(500, err);
}
