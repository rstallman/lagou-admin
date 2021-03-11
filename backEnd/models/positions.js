const { Positions } = require("../utils/db")


exports.add = (data) => {
  const position = new Positions(data)
  return position.save()
}

exports.list = () => {
  return Positions.find({}).sort({ _id: -1 })
}

exports.remove = (id) => {
  return Positions.deleteOne({ _id: id })
}