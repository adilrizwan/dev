--------------------------------------------
 -- LOGIN
 go
CREATE PROCEDURE loginUser
  @Email varchar(255)
AS
BEGIN
  SET NOCOUNT ON;
  IF EXISTS (SELECT 1 FROM Credentials WHERE Email = @Email)
  BEGIN
    SELECT Password, UserRole from Credentials where Email = @Email
  END
  ELSE
  BEGIN
    SELECT 0;
  END
END
go
--------------------------------------------
-- REGISTER Lot Owner
go
create proc registerLotOwner
@role varchar(20),
@email varchar(255),
@phoneNo varchar(20),
@name varchar(MAX),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into LotOwner (Email,PhoneNo,Name) values (@email, @phoneNo, @name)
end
go
---------------------------------------------------------
-- REGISTER CarOwner
go
create proc registerCarOwner
@role varchar(20),
@email varchar(255),
@firstName varchar(50),
@lastName varchar(50),
@gender varchar(10),
@dob date,
@phoneNo varchar(20),
@city varchar(50),
@country varchar(50),
@coins decimal(10,2),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into CarOwner (FirstName, LastName, Gender, DOB, PhoneNo, Email, City, Country ,Coins) values (@firstName, @lastName, @gender, @dob, @phoneNo, @email, @city, @country, @coins)
end
go
-----------------------------------------------------
-- REGISTER ADMIN
go
create proc registerPSAdmin
@role varchar(20),
@firstName varchar(50),
@lastName varchar(50),
@email varchar(255),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into Admin (FirstName,LastName,Email) values (@firstName, @lastName, @email)
end
go
-----------------------------------------------------
--Get details
go
CREATE PROC GetDetails
@Email varchar(255),
@UserRole varchar(20)
AS
BEGIN
	Declare @sql nvarchar(MAX)
	SET @sql = N'SELECT * FROM ' + QUOTENAME(@UserRole) + ' WHERE Email = @Email';
    EXEC sp_executesql @Sql, N'@Email NVARCHAR(255)', @Email;
END
go
----------------------------------------------------------------------
--Admin Search
go
CREATE PROCEDURE DynamicSearch
    @table_name VARCHAR(50),
    @search_column VARCHAR(50),
	@search_value VARCHAR(50),
	@offset int,
	@pageSize int
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @query NVARCHAR(MAX);
	DECLARE @queryCount NVARCHAR(MAX);

    -- Build the SQL query based on the input parameters
    IF @search_column = 'NULL' AND @search_value = 'NULL'
		BEGIN
			-- Return all records from the specified table
			IF @table_name = 'TBD' OR @table_name = 'TBDL'
				BEGIN
					SET @query = 'SELECT * FROM ' + QUOTENAME(@table_name) + ' ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
					SET @queryCount = 'SELECT COUNT(ID) AS TOTAL FROM ' + QUOTENAME(@table_name)
					EXEC sp_executesql @queryCount
					EXEC sp_executesql @query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
				END
			ELSE
				BEGIN
					SET @query = 'SELECT * FROM ' + QUOTENAME(@table_name) + ' ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
					SET @queryCount = 'SELECT COUNT(ID) AS TOTAL FROM ' + QUOTENAME(@table_name)
					EXEC sp_executesql @queryCount
					EXEC sp_executesql @query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
				END
		END

	ELSE IF @search_column = 'NULL' AND @search_value != 'NULL'
			BEGIN
				DECLARE @sql_query nvarchar(MAX) = 'SELECT * FROM ' + QUOTENAME(@table_name) + ' WHERE 1=0';
				DECLARE @query_b nvarchar(MAX) = '';
				DECLARE @sql_query_count nvarchar(MAX) = 'SELECT COUNT(*) AS TOTAL FROM ' + QUOTENAME(@table_name) + ' WHERE 1=0 ';
				IF @table_name = 'TBD' OR @table_name = 'TBDL'
				BEGIN
					SELECT @query_b += ' OR ' + c.name + ' LIKE ''%' + @search_value + '%'''
					FROM sys.columns c
					WHERE c.object_id = OBJECT_ID(QUOTENAME(@table_name))
					ORDER BY c.column_id;
					SELECT @sql_query_count += @query_b
					EXEC sp_executesql @sql_query_count
					SELECT @sql_query += @query_b
					SELECT @sql_query += ' ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
					EXEC sp_executesql @sql_query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
				END
				ELSE
				BEGIN
					SELECT @query_b += ' OR ' + c.name + ' LIKE ''%' + @search_value + '%'''
					FROM sys.columns c
					WHERE c.object_id = OBJECT_ID(QUOTENAME(@table_name))
					ORDER BY c.column_id;
					SELECT @sql_query_count += @query_b
					EXEC sp_executesql @sql_query_count
					SELECT @sql_query += @query_b
					SELECT @sql_query += ' ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
					EXEC sp_executesql @sql_query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
				END
			END

    ELSE IF @search_column != 'NULL' AND @search_value != 'NULL'
	BEGIN
		IF @table_name = 'TBD' OR @table_name = 'TBDL'
		BEGIN
			SET @queryCount = 'SELECT COUNT(*) AS TOTAL FROM ' + QUOTENAME(@table_name) + ' WHERE ' + QUOTENAME(@search_column) + ' like ''%' + @search_value + '%''';
			SET @query = 'SELECT * FROM ' + QUOTENAME(@table_name) + ' WHERE ' + QUOTENAME(@search_column) + ' like ''%' + @search_value + '%''ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY' ;
			EXEC sp_executesql @queryCount
			EXEC sp_executesql @query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
;
		END
		ELSE
		BEGIN
			SET @queryCount = 'SELECT COUNT(*) AS TOTAL FROM ' + QUOTENAME(@table_name) + ' WHERE ' + QUOTENAME(@search_column) + ' like ''%' + @search_value + '%''';
			SET @query = 'SELECT * FROM ' + QUOTENAME(@table_name) + ' WHERE ' + QUOTENAME(@search_column) + ' like ''%' + @search_value + '%''ORDER BY ID OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY' ;
			EXEC sp_executesql @queryCount
			EXEC sp_executesql @query, N'@offset INT, @pageSize INT', @offset = @offset, @pageSize = @pageSize;
		END
	END
	ELSE
	BEGIN
		SELECT 0
	END
END
-----------------------------------------------------
--Credit Coins
go
CREATE PROCEDURE CreditCoins
  @Email VARCHAR(255),
  @Coins INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the email exists in the CarOwner table
  IF EXISTS (SELECT 1 FROM CarOwner WHERE Email = @Email)
  BEGIN
    -- Update the coins for the matching email
    UPDATE CarOwner
    SET Coins = Coins + @Coins
    WHERE Email = @Email;

    -- Optionally, you can return a success message or status code
    SELECT 1;
  END
  ELSE
  BEGIN
    -- If the email does not exist, return an error message or handle accordingly
    SELECT 0 ;
  END
END;
go
select * from CarOwner