var connectionString = {  
	    client: 'pg',
	    connection: {
	        host: 'ec2-54-225-165-132.compute-1.amazonaws.com', // IP or domain name
	        user: 'rpjjyrwrvbfmyo', // DB username
	        password: 'c4JJX-UqiY4eqwDPMvQk_pjiIU', // DB password
	        database: 'd662a1395kh861', // DB name
	        charset: 'utf8', // Or your preferred charset
	        ssl: true
	    }
	};

module.exports = connectionString;