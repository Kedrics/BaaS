CREATE VIEW User_Bots AS SELECT B.Bot_ID, B.OS, B.IP_Address FROM Bots B JOIN Interface I ON B.Interface_ID = I.Interface_ID JOIN User U ON I.User_ID = U.User_ID WHERE U.User_ID = [insert user id here];
CREATE VIEW Staff_Tickets AS SELECT ST.Ticket_ID, ST.Description, ST.Messages, ST.Time_stamp, ST.User_ID FROM Support_Tickets ST JOIN Manages M ON ST.Ticket_ID = M.Ticket_ID
