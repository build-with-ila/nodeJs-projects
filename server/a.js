    const users = [{"id":1,"first_name":"Lanie","last_name":"Clemo","email":"lclemo0@creativecommons.org","gender":"Female","job_title":"Developer II"},{"id":2,"first_name":"Moselle","last_name":"Maryan","email":"mmaryan1@nba.com","gender":"Female","job_title":"Professor"},{"id":3,"first_name":"Alysa","last_name":"McNamara","email":"amcnamara2@skype.com","gender":"Genderqueer","job_title":"Sales Representative"},{"id":4,"first_name":"Dorine","last_name":"Sueter","email":"dsueter3@vinaora.com","gender":"Female","job_title":"Software Engineer II"},{"id":5,"first_name":"Shelley","last_name":"Baldinotti","email":"sbaldinotti4@clickbank.net","gender":"Female","job_title":"Marketing Assistant"},{"id":6,"first_name":"Tripp","last_name":"Thornton","email":"tthornton5@ovh.net","gender":"Male","job_title":"Administrative Officer"},{"id":7,"first_name":"Luelle","last_name":"Thunders","email":"lthunders6@imageshack.us","gender":"Female","job_title":"Civil Engineer"},{"id":8,"first_name":"Zackariah","last_name":"Chree","email":"zchree7@apache.org","gender":"Male","job_title":"VP Quality Control"},{"id":9,"first_name":"Colby","last_name":"Dyment","email":"cdyment8@cdbaby.com","gender":"Male","job_title":"Geologist I"},{"id":10,"first_name":"Davide","last_name":"Bottrell","email":"dbottrell9@vinaora.com","gender":"Male","job_title":"Legal Assistant"},{"first_name":"Jane","last_name":"Doe","gender":"female","job_title":"Developer","email":"janedoe@gmail.com","id":11}]
    
    
    //const data = {"first_name":"Jane","last_name":"Doe","gender":"female","job_title":"Developer","email":"janedoe@gmail.com","id":11}
    const data = {"first_name":"John","last_name":"Grisham","gender":"male","job_title":"Writer","email":"johngrisham@gmail.com","id":11};

  
    Object.assign(users, users.map(user => user.id === data.id? data : user));
    const user1 = users.find((user)=>user.id === data.id);
    console.log(user1);
    //console.dir(users);