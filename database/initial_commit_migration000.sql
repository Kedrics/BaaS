--Dont Use This File--

CREATE TABLE User
(
  User_ID VARCHAR(128) NOT NULL,
  Email VARCHAR(128) NOT NULL,
  Username VARCHAR(128) NOT NULL,
  Password VARCHAR(128) NOT NULL,
  Blocked INT NOT NULL,
  Bitcoin_Wallet VARCHAR(256) NOT NULL,
  PRIMARY KEY (User_ID),
  UNIQUE (Email),
  UNIQUE (Username)
);

CREATE TABLE Interface
(
  Interface_ID VARCHAR(128) NOT NULL,
  User_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Interface_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Support_Tickets
(
  Ticket_ID VARCHAR(128) NOT NULL,
  Description VARCHAR(2048) NOT NULL,
  Messages VARCHAR(2048) NOT NULL,
  Time_stamp VARCHAR(256) NOT NULL,
  User_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Ticket_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Support_Staff
(
  Staff_ID VARCHAR(128) NOT NULL,
  Developer INT,
  PRIMARY KEY (Staff_ID)
);

CREATE TABLE Affiliates
(
  Affiliate_ID VARCHAR(128) NOT NULL,
  Total_bots_added INT NOT NULL,
  Money_received FLOAT NOT NULL,
  User_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Affiliate_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Botnet_Order
(
  Number_of_bots INT NOT NULL,
  Order_ID VARCHAR NOT NULL,
  Time_of_use FLOAT NOT NULL,
  Price FLOAT NOT NULL,
  Approved INT,
  Time_stamp VARCHAR(256) NOT NULL,
  User_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Order_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Manages
(
  Staff_ID VARCHAR(128) NOT NULL,
  Ticket_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Staff_ID, Ticket_ID),
  FOREIGN KEY (Staff_ID) REFERENCES Support_Staff(Staff_ID),
  FOREIGN KEY (Ticket_ID) REFERENCES Support_Tickets(Ticket_ID)
);

CREATE TABLE Manages
(
  Staff_ID VARCHAR(128) NOT NULL,
  Order_ID VARCHAR NOT NULL,
  PRIMARY KEY (Staff_ID, Order_ID),
  FOREIGN KEY (Staff_ID) REFERENCES Support_Staff(Staff_ID),
  FOREIGN KEY (Order_ID) REFERENCES Botnet_Order(Order_ID)
);

CREATE TABLE Bots
(
  Bot_ID VARCHAR(128) NOT NULL,
  OS VARCHAR(32) NOT NULL,
  IP_Address VARCHAR(15) NOT NULL,
  Interface_ID VARCHAR(128),
  PRIMARY KEY (Bot_ID),
  FOREIGN KEY (Interface_ID) REFERENCES Interface(Interface_ID),
  UNIQUE (IP_Address)
);

CREATE TABLE Adds
(
  Bot_ID VARCHAR(128) NOT NULL,
  Affiliate_ID VARCHAR(128) NOT NULL,
  PRIMARY KEY (Bot_ID, Affiliate_ID),
  FOREIGN KEY (Bot_ID) REFERENCES Bots(Bot_ID),
  FOREIGN KEY (Affiliate_ID) REFERENCES Affiliates(Affiliate_ID)
);
