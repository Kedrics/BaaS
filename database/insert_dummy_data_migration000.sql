USE class;

-- Insert dummy data into User table
INSERT INTO User (User_ID, Email, Username, Password, Blocked, Bitcoin_Wallet)
VALUES (9999, 'john@example.com', 'johndoe', 'pa$$word', 0, '0x1234567890abcdef');

-- Insert dummy data into Interface table
INSERT INTO Interface (Interface_ID, User_ID)
VALUES (9999, 9999);

-- Insert dummy data into Support_Tickets table
INSERT INTO Support_Tickets (Ticket_ID, Description, Messages, Time_stamp, User_ID)
VALUES (9999, 'I cannot log into my account', 'Please help me reset my password', '2022-10-15 14:35:00', 9999);

-- Insert dummy data into Support_Staff table
INSERT INTO Support_Staff (Staff_ID, Developer)
VALUES (9999, 1);

-- Insert dummy data into Affiliates table
INSERT INTO Affiliates (Affiliate_ID, Total_bots_added, Money_received, User_ID)
VALUES (9999, 10, 50.00, 9999);

-- Insert dummy data into Botnet_Order table
INSERT INTO Botnet_Order (Order_ID, Number_of_bots, Time_of_use, Price, Approved, Time_stamp, User_ID)
VALUES (9999, 100, 8.0, 500.00, 1, '2022-09-20 10:15:00', 9999);

-- Insert dummy data into Manages (Support_Tickets) table
INSERT INTO Manages (Staff_ID, Ticket_ID)
VALUES (9999, 9999);

-- Insert dummy data into Bots table
INSERT INTO Bots (Bot_ID, OS, IP_Address, Interface_ID)
VALUES (9999, 'Windows', '192.168.1.100', 9999);

-- Insert dummy data into Affiliates (Adds) table
INSERT INTO Adds (Bot_ID, Affiliate_ID)
VALUES (9999, 9999);