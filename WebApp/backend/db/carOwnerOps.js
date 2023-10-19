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
      .query(`SELECT * FROM CAR WHERE OwnerID = @ID`);
    //   .query(`EXEC LotOwnerDashboard @ID, @offset, @pageSize`);
    //   const fetched = await paginate.resultCount(
    //     offset,
    //     query.recordsets[1].length,
    //     query.recordsets[0].TOTAL
    //   );
    //   return {
    //     Results:
    //       "Showing " +
    //       fetched +
    //       " of " +
    //       query.recordsets[0][0].TOTAL +
    //       " results",
    //     MyLots: query.recordsets[1],
    //   };
    return query.recordsets[0]
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
      .query(`SELECT * from CarOwner where ID = @ID`);
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
      .input("FirstName", sql.VarChar, post.FirstName.toUpperCase()) 
      .input("LastName", sql.VarChar, post.LastName.toUpperCase()) 
      .input("Gender", sql.VarChar, post.Gender.toUpperCase()) 
      .input("DOB", sql.Date, post.DOB.toUpperCase()) 
      .input("City", sql.VarChar, post.City.toUpperCase()) 
      .input("Country", sql.VarChar, post.Country.toUpperCase()) 
      .input("PhoneNo", sql.VarChar, post.PhoneNo)
      .query(`IF EXISTS (SELECT 1 FROM CarOwner WHERE ID = @ID)
            BEGIN
                UPDATE CarOwner SET 
                    FirstName = @FirstName,  
                    LastName = @LastName,  
                    Gender = @Gender,  
                    DOB = @DOB,  
                    City = @City,  
                    Country = @Country,  
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
exports.addCar = async (ID, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("ID", sql.Int, ID)
      .input("RegistrationNumber", sql.VarChar, post.RegNo.toUpperCase()) 
      .input("Make", sql.VarChar, post.Make.toUpperCase())
      .input("Model", sql.VarChar, post.Model.toUpperCase())
      .input("RegYear", sql.Int, post.RegYear)
      .input("Color", sql.VarChar, post.Color.toUpperCase())
      .input("Type", sql.VarChar, post.Type.toUpperCase())
      .query(`EXEC AddCar @ID, @RegistrationNumber, @Make, @Model, @RegYear, @Color, @Type`);
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
exports.deleteCar = async (OwnerID, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("OwnerID", sql.Int, OwnerID)
      .input("RegNo", sql.VarChar, post.RegNo) 
      .input("Status", sql.VarChar, post.Status) 
      .query(`EXEC DeleteCar @OwnerID, @RegNo`);
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
