-- A username should be at least 4 characters long
ALTER User ADD CHECK (Username>=4);

-- An email address must follow the standards for a valid email address

-- Email addresses must not be on the DNS block list (CIS 9.2)
CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

-- Passwords must be hashed and salted before storing. They must be at least 12 characters long.

-- Bitcoin wallet must start with 0x and only contain numbers afterwards

-- IP must follow the standard X.X.X.X where X is between 0 and 256
CHECK (ip REGEXP '^([0-9]{1,3}\.){3}[0-9]{1,3}$')

-- All IDs (Primary Keys) are defined using UUID format (XXXXXXXX-XXXX-4XXX-XXXX-XXXXXXXXXXXX)

-- Botnet order price is a calculated field, equal to number of bots * bot cost

-- Time_of_use (in months) cannot be longer than 12 months
ALTER Botnet_Order ADD CHECK (Time_of_use<=12 AND Time_of_use>=0);
