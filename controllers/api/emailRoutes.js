const router = require('express').Router();
// const { CronJob } = require('cron');
const axios = require('axios')
const { Task, User } = require('../../models');
const dayjs = require('dayjs')
// const cron = require('node-cron')

//REST API request to send emails with emailjs
// const run = () => {
    
    router.post('/', async (req, res) => {
        console.log(`\n\n\n+++++++++++++++++++++++++++++\n\n\n cron worked and run() initiated\n\n\n++++++++++++++++++++++++++++++++++++\n\n\n`);
        try {
            const dueUsers = await getDueUsers();
            //if...else to set template params if only a single object is returned from getDueUsers() versus if an array of objects is returned
            if (dueUsers.length < 2) {
                const dueTemplParams = { to_name: dueUsers.username, to_email: dueUsers.email };
                sendDueEmails(dueTemplParams)
            }
            dueUsers.forEach((item) => {
                const dueTemplParams = { to_name: item.username, to_email: item.email };
                sendDueEmails(dueTemplParams)
            })
            
            
        } catch(err) {
            console.log(err)
        }
    
        try {
            const overdueUsers = await getOverdueUsers();
            if (overdueUsers.length < 2) {
                const overdueTemplParams = { to_name: overdueUsers.username, to_email: overdueUsers.email };
                sendOverdueEmails(overdueTemplParams)
            }
                // const overdueArray = [{to_name: 'H', to_email:'jpmankovich@gmail.com'}, {to_name:'K', to_email:'jpmankovich@gmail.com'}]
            overdueUsers.forEach((item) => {
                const overdueTemplParams = {to_name: item.username, to_email: item.email};
                sendOverdueEmails(overdueTemplParams)
            })
            
          
        } catch(err) {
            console.log(err)
        }
    });
// };

//sending emails to users with tasks due the next day
const sendDueEmails = (dueTemplParams) => {
    console.log('+++++++++++++++++++++\n\nsend due emails is running\n\n++++++++++++++++++++++')
    
    const dueEmailData = {
        service_id: 'service_ojacxn7',
        template_id: 'template_fq9gwkf',
        user_id: process.env.EMAIL_KEY, 
        template_params: dueTemplParams
    };
    
    axios({
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data: dueEmailData
    })
      .then(function (res) {
       res.json('success')})
      .catch(function (error) {
        console.log(error)
    });
}

//sending emails to users with overdue tasks that were due the day before
const sendOverdueEmails = (overdueTemplParams) => {
    console.log('+++++++++++++++++++++\n\nsend overdue emails is running\n\n++++++++++++++++++++++')
    const overdueEmailData = {
        service_id: 'service_ojacxn7',
        template_id: 'template_fywne69',
        user_id: process.env.EMAIL_KEY, 
        template_params: overdueTemplParams
    };
    
    axios({
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data: overdueEmailData
    })
      .then(function (res) {
       res.json('success')})
      .catch(function (error) {
        console.log(error)
    });
}

//return the date of the day after it is called
const tomorrowDate = () => {
    const today = dayjs(new Date());
    const tomorrow = today.add(1, 'day');
    const dateTomorrow = tomorrow.format('MM-DD-YYYY');
    console.log(`+++++++++++++++++++++\n\nTask due date is ${dateTomorrow}\n\n+++++++++++++++++++++`);
    return dateTomorrow
}

//return the date of the day before it is called
const yesterdayDate = () => {
    const today = dayjs(new Date());
    const yesterday = today.subtract(1, 'day');
    const dateYesterday = yesterday.format('MM-DD-YYYY');
    console.log(`+++++++++++++++++++++\n\nTask due date was ${dateYesterday}\n\n+++++++++++++++++++++`);
    return dateYesterday
}

//return the users who have tasks due the next day
async function getDueUsers() {
    try {
        console.log('+++++++++++++++++++++\n\nget due users is running\n\n++++++++++++++++++++++')
        
        //filter all tasks for those whose due date is the next day
        const dueTasks = await Task.findAll({
            where: {
                task_due: tomorrowDate(),
            },
            include: [ {model: User} ]
        }) ; 
        //create new array of objects for each returned task object comprised of embedded user info needed to fill in email-template parameters
        const dueUsers = dueTasks.map((obj) => ({ ...obj.User.dataValues }));
        
        return dueUsers

        // const emailsObj = Object.groupBy(dueUsersArray, ({ email }) => email);
        // console.log(emailsObj)
        // await getDueEmails(dueTasks);
        
    } catch {(err) => {
        console.log(err);
        res.status(400).json(err)
    }}
};

//return the users who had tasks due the day before
async function getOverdueUsers() {
    try {
        // console.log('+++++++++++++++++++++\n\nget overdue users is running\n\n++++++++++++++++++++++')
        
        //filter all tasks for those whose due date was the day before
        const overdueTasks = await Task.findAll({
            where: {
                task_due: yesterdayDate(),
            },
            include: [ {model: User} ]
        });
        //create new array of objects for each returned task object comprised of embedded user info needed to fill in email-template parameters
        const overdueUsers = overdueTasks.map((obj) => ({ ...obj.User.dataValues }));
        return overdueUsers
        
    } catch {(err) => {
        console.log(err);
        res.status(400).json(err)
    }} 
}

//calling the function to kick off the email sending
//TODO: code some sort of event listener that will fire this function (needed for presentation maybe even if cron gets working)
//TODO: IDEALLY: get cron functional to run this at a set time every day
// run();

// const job = CronJob.from({
//     // '0 1 0 * * *', /* midnight +1 min cronTime */ 
//     cronTime: '0 40 0 * * *',
//     onTick: run(), /*onTick*/
//     start: true,
//     timeZone: 'UTC-10' /* time zone...set to hawaiian to cross midnight into a new day for all living within the US */
// });

// job.start();

// const task = cron.schedule(
//     '0 2 7 * * *', 
//     () => {run()},
//     // () => {console.log(`\n\n\n+++++++++++++\n\n\n test: cron worked\n\n\n++++++++++++++++++++++++++\n\n\n`)}, 
//     // {
//     //     scheduled: true,
//     //     timeZone: 'America/Los_Angeles'
//     // }
// );

// task.start();

module.exports = router;