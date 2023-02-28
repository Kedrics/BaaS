-- A username should be at least 4 characters long
ALTER User ADD CHECK (Username>=4);

-- Email addresses must not be on the DNS block list (CIS 9.2)
ALTER User ADD CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

-- IP must follow the standard X.X.X.X where X is between 0 and 256
ALTER Bots ADD CHECK (IP_Address REGEXP '^([0-9]{1,3}\.){3}[0-9]{1,3}$');

-- Time_of_use (in months) cannot be longer than 12 months
ALTER Botnet_Order ADD CHECK (Time_of_use<=12 AND Time_of_use>=0);
