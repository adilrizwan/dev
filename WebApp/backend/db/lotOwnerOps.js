const sql = require("mssql");
const { pool } = require("./sqlConfig");
const paginate = require("../middleware/pagination");

exports.dashboard = async (ID, offset, pageSize) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("ID", sql.Int, ID)
      .input("offset", sql.Int, offset)
      .input("pageSize", sql.Int, pageSize)
      .query(`EXEC LotOwnerDashboard @ID, @offset, @pageSize`);
      const fetched = await paginate.resultCount(
        offset,
        query.recordsets[1].length,
        query.recordsets[0].TOTAL
      );
      return {
        Results:
          "Showing " +
          fetched +
          " of " +
          query.recordsets[0][0].TOTAL +
          " results",
        MyLots: query.recordsets[1],
      };
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getProfile = async (ID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("ID", sql.Int, ID)
      .query(`SELECT * from LotOwner where ID = @ID`);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updateProfile = async (ID, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("ID", sql.Int, ID)
      .input("Name", sql.VarChar, post.Name.toUpperCase()) 
      .input("PhoneNo", sql.VarChar, post.PhoneNo)
      .query(`IF EXISTS (SELECT 1 FROM LotOwner WHERE ID = @ID)
            BEGIN
                UPDATE LotOwner SET 
                    Name = @Name,  
                    PhoneNo = @PhoneNo 
                WHERE ID = @ID;
                SELECT 1;
            END
            ELSE
            BEGIN
                SELECT 0;
            END`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
      return 1;
    } else {
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.addLot = async (ID, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("ID", sql.Int, ID)
      .input("TotalZones", sql.Int, post.TotalZones) 
      .input("PostalCode", sql.VarChar, post.PostalCode.toUpperCase())
      .input("AddressL1", sql.VarChar, post.AddressL1.toUpperCase())
      .input("AddressL2", sql.VarChar, post.AddressL2.toUpperCase())
      .input("City", sql.VarChar, post.City.toUpperCase())
      .input("Country", sql.VarChar, post.Country.toUpperCase())
      .input("LotName", sql.VarChar, post.LotName.toUpperCase())
      .query(`EXEC AddLot @ID, @TotalZones, @PostalCode, @AddressL1, @AddressL2, @City, @Country, @LotName`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
      return 1;
    } else {
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updateLotStatus = async (OwnerID, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("LotOwnerID", sql.Int, OwnerID)
      .input("LotID", sql.Int, post.LotID) 
      .input("Status", sql.VarChar, post.Status) 
      .query(`EXEC UpdateLotStatus @LotOwnerID, @LotID, @Status`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
      return 1;
    } else {
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
