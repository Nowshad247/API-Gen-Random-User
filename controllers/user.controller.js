const data = require("../utils/userdata.json");
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "../utils");

module.exports.randomData = (req, res, next) => {
  const random = Math.floor(Math.random() * data.length);
  const randomData = data.find((user) => user.ID == random);
  res.json({
    Id: randomData.ID,
    gender: randomData.gender,
    name: randomData.name,
    contact: randomData.contact,
    address: randomData.address,
    photoUrl: randomData.photoUrl,
  });
};
module.exports.all = (req, res, next) => {
  const { limit, page } = req.query;

  if (limit) {
    res.json(data.slice(0, limit));
  } else {
    res.json(data);
  }
};
module.exports.save = (req, res, next) => {
  const { name, gender, contact, address, photoUrl } = req.body;
  let student = {
    ID: data.length + 1,
    name: name,
    FName: "F Name",
    MName: "M Name",
    Email: "demo@gmail.com",
    contact: contact,
    gender: gender,
    address: address,
    photoUrl: photoUrl,
  };
  const newData = [...data, student];
  const dataStr = JSON.stringify(newData);

  if (!name || !gender || !contact || !address || !photoUrl) {
    res.json({ note: "plz Submit all data on body" });
  } else {
    fs.writeFileSync(directoryPath + "/userdata.json", dataStr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(done);
      }
    });
    res.json(data);
  }
};

module.exports.update = (req, res, next) => {
  const { id } = req.query;
  const { name, gender, contact, address, photoUrl } = req.body;
  const findData = data.find((user) => user.ID == id);
  if (!findData) {
    res.send("ID NOT FOUND");
    res.end();
  } else {
    if (name) findData.name = name;
    if (gender) findData.gender = gender;
    if (contact) findData.contact = contact;
    if (address) findData.address = address;
    if (photoUrl) findData.photoUrl = photoUrl;
    const newData = [...data];
    const dataStr = JSON.stringify(newData);
    fs.writeFileSync(directoryPath + "/userdata.json", dataStr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(done);
      }
    });
    res.send(newData);
    res.end();
  }
};
module.exports.bulkUpdate = (req, res) => {
  const { id, name, gender, contact, address, photoUrl } = req.body;
  const updateIdList = id.map((id) => {
    const findData = data.find((user) => Number(user.ID) == Number(id));
    if (!findData) {
      res.send("ID NOT FOUND");
      res.end();
    } else {
      console.log(id, name);
    }
  });
  res.end();
};
module.exports.delete = (req, res, next) => {
  const { id } = req.query;
  const filterData = data.filter((user) => Number(user.ID) !== Number(id));
  const stringify = JSON.stringify(filterData);
  fs.writeFileSync(directoryPath + "/userdata.json", stringify, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(done);
    }
  });
  res.send(data);
  res.end();
};
